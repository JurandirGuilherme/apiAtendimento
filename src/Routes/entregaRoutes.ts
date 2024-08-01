import Express from "express";
import entregaController from "../Controllers/entrega.controller";
const entregaRoute = Express();


entregaRoute.get("/", entregaController.listar)
entregaRoute.post("/", entregaController.criar)


export default entregaRoute