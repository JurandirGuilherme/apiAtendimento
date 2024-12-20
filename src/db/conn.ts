import { Sequelize } from "sequelize";
import 'dotenv/config';
import process from "process";


const sequelize = new Sequelize(process.env.DATABASE as string,process.env.USERDB as string, process.env.PASSWORD as string,{
     host:process.env.HOST,
     port: Number(process.env.PORT),
     dialect:'postgres'
})

sequelize.authenticate().then(()=>{
     console.log('Banco de dados conectado')
}).catch((erro)=>{
     console.log(erro)
})

// try{
// }catch(erro){
// }

export default sequelize