import { ModelStatic } from "sequelize";
import Pedido from "../db/models/Pedido";
import resp from "../utils/resp";
import axios from "axios";
import respM from "../utils/respM";
import Entrega from "../db/models/Entrega";
import User from "../db/models/User";

abstract class PedidoService {
  static model: ModelStatic<Pedido> = Pedido;

  public static async listar() {
    const pedidos = await this.model.findAll();
    return resp(200, pedidos);
  }

  public static async listarImpressos() {
    const pedidos = await this.model.findAll({
      where: { impresso: true },
      include: [
        { model: Entrega, as: "entrega", attributes: ["nome"] },
        { model: User, as: "solicitante", attributes: ["id", "nome"] },
      ],
    });
    return resp(200, pedidos);
  }

  public static async listarEmFila() {
    console.log;
    const pedidos = await this.model.findAll({
      include: [
        { model: Entrega, as: "entrega", attributes: ["nome"] },
        { model: User, as: "solicitante", attributes: ["id", "nome"] },
      ],
      where: { impresso: false },
    });
    return resp(200, pedidos);
  }

  public static async impresso(body: { pedido: Number; userId: string }) {
    const { userId, pedido } = body;
    const pedidos = this.model.update(
      { impresso: true, operadorId: userId, dtImpressao: new Date() },
      { where: { numero: pedido, impresso: false } }
    );
    return resp(200, pedidos);
  }

  public static async criar(body: {
    pedido: Number;
    userId: string;
    entrega: number;
  }) {
    const { pedido, userId, entrega: entregaCode } = body;
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

    const verifyPedido = await this.model.findAll({where:{pedido}})
    if (!pedidoIdNet)
      return respM(404, "Nº de pedido não existe ou incorreto.");
    const { numeroPedido, podeImprimir, siglaPostoOrigem } = pedidoIdNet;
    if (!podeImprimir)
      return respM(401, "Pedido não encontrasse em fila para emição.");

    if(verifyPedido) return respM(401, "Pedido já existente em fila de prioridade.")
    console.log(entregaCode, podeImprimir);

    const Pedido = await this.model.create({
      numero: numeroPedido,
      solicitanteId: userId,
      postoOrigem: siglaPostoOrigem,
      entregaCode,
    });
    Pedido.save();
    return resp(200, Pedido);
  }
}

export default PedidoService;
