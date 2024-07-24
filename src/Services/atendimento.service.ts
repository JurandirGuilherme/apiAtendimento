import { ModelStatic, Op, where } from "sequelize";
import Atendimento from "../db/models/Atendimento";
import resp from "../utils/resp";
import Requerente from "../db/models/Requerente";
import User from "../db/models/User";
// import schema from "./validations/schema";

abstract class AtendimentoService {
    static model: ModelStatic<Atendimento> = Atendimento;

    public static async listar(){
        const Atendimentos =  await this.model.findAll();
        return resp(200, Atendimentos)
    }
    
    public static async criar(body:{requerenteId:string, userId:string}) {
        const atendimento = await this.model.create(body)
        atendimento.save();
        const requerente = await Requerente.update({atendido: true}, {where: {id: body.requerenteId}})
        console.log(requerente)
        return resp(200, atendimento)
    }
    public static async listarEmAtendimentoUser(body: {userId:string}) {
        const {userId} = body
        const atendimento = await Atendimento.findAll({
          include: [{
            model: User,
            as: "usuario",
            attributes: ['nome'],
          },{
            model: Requerente,
            as:'requerente',
            attributes:['nome']
          }],
          where: { userId, fim:null },
        });
        return resp(200, atendimento);
      }
      public static async listarAtendidosUser(body: {userId:string}) {
        const {userId} = body
        const atendimento = await Atendimento.findAll({
          include: [{
            model: User,
            as: "usuario",
            attributes: ['nome'],
          },{
            model: Requerente,
            as:'requerente',
            attributes:['nome']
          }],
          where: { userId, fim:{[Op.not]: null} },
        });
        return resp(200, atendimento);
      }

    public static async fimAtendimento(body:{atendimentoId:string}) {
        const atendimento = await this.model.update({fim: new Date()}, {where: {id: body.atendimentoId}})
        console.log(atendimento)
        return resp(200, atendimento)
    }
}

export default AtendimentoService