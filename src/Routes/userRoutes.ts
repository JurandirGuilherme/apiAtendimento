import Express from "express";
import Controller from "../Controllers/user.controler";

const userRoute = Express();

//Cadastro
userRoute.post("/sign", Controller.criarUsuario)

//Login 
userRoute.post("/login", Controller.login)

userRoute.get("/", Controller.listar)

userRoute.get("/id", Controller.getUser)



export default userRoute