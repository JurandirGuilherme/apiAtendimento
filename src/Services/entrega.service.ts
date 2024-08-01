import { ModelStatic } from "sequelize";
import Entrega from "../db/models/Entrega";
import resp from "../utils/resp";
import axios from "axios";


abstract class EntregaService {
    static model: ModelStatic<Entrega> = Entrega;

    public static async listar(){

        const Entregas = await this.model.findAll();
        return resp(200, Entregas)
    }
    
    public static async criar(body:{Entrega:Number, userId: string}) {
      
        const Entrega = await this.model.create({nome: 'Posto Destino', code: 2 })
        Entrega.save();
        return resp(200, Entrega)
    }
}

export default EntregaService