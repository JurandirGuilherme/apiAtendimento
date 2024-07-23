import { ModelStatic } from "sequelize";
import Requerente from "../db/models/Requerente";
import resp from "../utils/resp";
import User from "../db/models/User";
import UserCargo from "../db/models/UserCargo";
import respM from "../utils/respM";
// import schema from "./validations/schema";

abstract class RequerenteService {
    static model: ModelStatic<Requerente> = Requerente;

    public static async listar(){
        const Requerentes =  await this.model.findAll();
        return resp(200, Requerentes)
    }
    
    public static async criar(body:{nome:string, preferencial:boolean, via: number, userId:string}) {
        const {userId, preferencial} = body
        const {cargoId} = await UserCargo.findOne({where: {userId}})
        if(preferencial == true && cargoId != 1) return respM(401, 'Não há autorização para preferencial.')
        const Requerente = await this.model.create(body)
        Requerente.save();
        return resp(200, Requerente)
    }
}

export default RequerenteService