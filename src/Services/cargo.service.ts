import { ModelStatic } from "sequelize";
import Cargo from "../db/models/Cargo";
import resp from "../utils/resp";
// import schema from "./validations/schema";

abstract class CargoService {
    static model: ModelStatic<Cargo> = Cargo;

    public static async listar(){
        const cargos =  await this.model.findAll();
        return resp(200, cargos)
    }
    
    public static async criar(body:{nome:string}) {
        const {nome} = body
        // const {error} = schema.cargo.validate(body)
        // if (error) return resp(422, {msg: error.message})
        const cargo = await this.model.create({nome})
        cargo.save();
        return resp(200, cargo)
    }
}

export default CargoService