import { ModelStatic, where } from "sequelize";
import Atendimento from "../db/models/Atendimento";
import resp from "../utils/resp";
import Requerente from "../db/models/Requerente";
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
    public static async fimAtendimento(body:{atendimentoId:string}) {
        const atendimento = await this.model.update({fim: new Date()}, {where: {id: body.atendimentoId}})
        console.log(atendimento)
        return resp(200, atendimento)
    }
}

export default AtendimentoService