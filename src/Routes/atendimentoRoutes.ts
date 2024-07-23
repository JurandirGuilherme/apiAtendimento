import Express from "express";
import AtendimentoController from "../Controllers/atendimento.controller";
const atendimentoRoute = Express();


atendimentoRoute.get("/", AtendimentoController.listar)
atendimentoRoute.post("/", AtendimentoController.criar)
atendimentoRoute.put("/", AtendimentoController.fimAtendimento)


export default atendimentoRoute