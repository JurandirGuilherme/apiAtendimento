import { ModelStatic, Op, where } from "sequelize";
import Pedido from "../db/models/Pedido";
import resp from "../utils/resp";
import axios from "axios";
import respM from "../utils/respM";
import Entrega from "../db/models/Entrega";
import User from "../db/models/User";
import { Moment } from "moment";
import moment from "moment";


abstract class PedidoService {
  static model: ModelStatic<Pedido> = Pedido;

  public static async listar() {
    const pedidos = await this.model.findAll({
      include: [
        { model: Entrega, as: "entrega", attributes: ["nome"] },
        { model: User, as: "solicitante", attributes: ["id", "nome"] },
      ],
    });
    return resp(200, pedidos);
  }

  public static async listarImpressos({
    inicioDt,
    fimDt,
  }: {
    inicioDt: string;
    fimDt: string;
  }) {
    const pedidos = await this.model.findAll({
      include: [
        { model: Entrega, as: "entrega", attributes: ["nome"] },
        { model: User, as: "solicitante", attributes: ["id", "nome"] },
        { model: User, as: "operador", attributes: ["id", "nome"] },
      ],
      where: {
        impresso: true,
        dtImpressao: {
          [Op.between]: [new Date(inicioDt), new Date(fimDt)],
        },
      },
    });
    return resp(200, pedidos);
  }

  public static async listarEmFila() {
    const pedidos = await this.model.findAll({
      include: [
        { model: Entrega, as: "entrega", attributes: ["nome"] },
        { model: User, as: "solicitante", attributes: ["id", "nome"] },
      ],
      where: { impresso: false, operadorId: null },
    });

    console.log(pedidos);

    return resp(200, pedidos);
  }

  public static async andamento({
    inicioDt,
    fimDt,
  }: {
    inicioDt: string;
    fimDt: string;
  }) {
    const pedidos = await this.model.findAll({
      include: [
        { model: Entrega, as: "entrega", attributes: ["nome"] },
        { model: User, as: "solicitante", attributes: ["id", "nome"] },
      ],
      where: {
        createdAt: {
          [Op.between]: [new Date(inicioDt), new Date(fimDt)],
        },
      },
    });

    return resp(200, pedidos);
  }

  public static async imprimir(body: { pedido: Number; userId: string }) {
    const { userId, pedido } = body;
    console.log(pedido);
    const { codigoAtividadeAtual } = await fetch(
      `https://idnet.pe.gov.br/Montreal.IdNet.Comunicacao.WebApi/atendimento/consultar/${pedido}`
    )
      .then(async (data) => await data.json())
      .catch(() => {
        console.log("Erro em imprimir service");
      });

    // console.log(codigoAtividadeAtual);
    // const { codigoAtividadeAtual } = await axios
    //   .get(
    //     `https://idnet.pe.gov.br/Montreal.IdNet.Comunicacao.WebApi/atendimento/consultar/${pedido}`
    //   )
    //   .then(({ data }) => data)
    //   .catch(() => {
    //     console.log("Erro em imprimir service");
    //   });

    if (codigoAtividadeAtual == 15)
      return respM(401, "Pedido em geração de carteira de identidade.");
    await this.model.update(
      { impresso: true, operadorId: userId, dtImpressao: new Date() },
      { where: { numero: pedido, impresso: false } }
    );
    const get = await this.model.findAll({
      include: [
        { model: Entrega, as: "entrega", attributes: ["nome"] },
        { model: User, as: "solicitante", attributes: ["id", "nome"] },
        { model: User, as: "operador", attributes: ["id", "nome"] },
      ],
      where: { impresso: false },
    });

    return resp(200, get);
  }
  public static async consultar({ pedido }: { pedido: number }) {
    const pedidoIdNet = await axios
      .get(
        `https://idnet.pe.gov.br/Montreal.IdNet.Comunicacao.WebApi/atendimento/consultar/${pedido}`
      )
      .then((e) => e.data)
      .catch((error) => {
        console.log(error);
      });
    if (!pedido) return respM(401, "Pedido não encontrado.");
    return resp(200, pedidoIdNet);
  }

  public static async criar(body: {
    pedido: Number;
    userId: string;
    entrega: number;
    observacao: string;
  }) {
    const { pedido, userId, entrega: entregaCode, observacao } = body;
    const pedidoIdNet = await axios
      .get(
        `https://idnet.pe.gov.br/Montreal.IdNet.Comunicacao.WebApi/atendimento/consultar/${pedido}`
      )
      .then(({ data }) => {
        return data;
      })
      .catch(() => {
        return null;
      });

    const verifyPedido = await this.model.findOne({
      where: { numero: pedido },
    });
    if (!pedidoIdNet)
      return respM(404, "Nº de pedido não existe ou incorreto.");
    const {
      numeroPedido,
      podeImprimir,
      siglaPostoOrigem,
      siglaPostoDestino,
      carteiraNacional,
      atividadeAtual,
      codigoAtividadeAtual,
    } = pedidoIdNet;

    //Entrega
    if (codigoAtividadeAtual == 18)
      return resp(401, { msg: "Carteira Impressa", ...pedidoIdNet });
    // Já Existe na base
    if (verifyPedido)
      return resp(401, {
        msg: "Pedido já existente em fila de prioridade",
        ...pedidoIdNet,
      });
    //Conferencia
    if (codigoAtividadeAtual == 19)
      return resp(401, {
        msg: "Pedido já foi impresso, aguardar finalização",
        ...pedidoIdNet,
      });
    //Comunicação Externa
    if (codigoAtividadeAtual == 103)
      return resp(401, {
        msg: "Pedido finalizado, enviando dados pro Gov.br",
        ...pedidoIdNet,
      });
    //Não pode Imprimir
    if (!podeImprimir)
      return resp(401, {
        msg: "Pedido não encontra-se em fila para emissão",
        ...pedidoIdNet,
      });

    const Pedido = await this.model.create({
      numero: numeroPedido,
      solicitanteId: userId,
      postoOrigem: siglaPostoOrigem,
      postoDestino: siglaPostoDestino,
      cin: carteiraNacional,
      observacao: String(observacao).trim() || null,
      entregaCode,
      atividadeAtual,
    });
    Pedido.save();
    return resp(200, Pedido);
  }

  public static async script() {

    const pedidos = await this.model.findAll({where: 
    {
    createdAt:{
      [Op.between]: [new Date("02/01/2025"), new Date("02/28/2025")]
    }
  },
  attributes:['numero', 'createdAt'],
  include:[{ model: User, as: "solicitante", attributes: ["nome"] }]
  }
  )
  console.log(pedidos)

  const tratamento = pedidos.map((data)=>{
    return {
      pedido: data.numero,
      dataSolicitacao:  moment(data.createdAt).format("DD/MM/YYYY"),
      NomeSolicitante: data.solicitante.nome
    }
  })

  return respM(200, tratamento);

  //   const pedidos = await this.model.findAll({ where: { impresso: false } });

  //   await Promise.all(
  //     pedidos.map((e) =>
  //       axios
  //         .get(
  //           `https://idnet.pe.gov.br/Montreal.IdNet.Comunicacao.WebApi/atendimento/consultar/${e.numero}`
  //         )
  //         .then(async ({ data }) => {
  //           if (data.carteiraNacional) {
  //             await this.model
  //               .update({ cin: true }, { where: { numero: e.numero } })
  //               .then((data) => {
  //                 console.log(data, " Foi");
  //               })
  //               .catch((error) => {
  //                 console.log("deu errado");
  //               });
  //           }
  //         })
  //     )
  //   );
  //   return respM(200, "ok");
  }
}

export default PedidoService;
