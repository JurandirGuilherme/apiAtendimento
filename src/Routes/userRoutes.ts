import Express from "express";
import Controller from "../Controllers/user.controler";

const userRoute = Express();

//Cadastro
userRoute.post("/sign", Controller.criarUsuario)

//Login 
userRoute.post("/login", Controller.login)

userRoute.get("/", Controller.listar)

userRoute.get("/id", Controller.getUser)

userRoute.get("/atendimentos", Controller.getUserAtendimento)

userRoute.get("/solicitantes", Controller.getUserSolicitantes)





export default userRoute