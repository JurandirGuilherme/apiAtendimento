import { Sequelize } from "sequelize";
import 'dotenv/config';
import process from "process";


const sequelize = new Sequelize(process.env.DATABASE,process.env.USERDB, process.env.PASSWORD,{
     host:process.env.HOST,
     port:process.env.PORT,
     dialect:process.env.DIALECT
})

try{
     await sequelize.authenticate()
     console.log('Banco de dados conectado')
}catch(erro){
     console.log(erro)
}

export default sequelize