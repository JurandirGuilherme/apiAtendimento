import Express from "express";
import AtendimentoController from "../Controllers/atendimento.controller";
const atendimentoRoute = Express();


atendimentoRoute.get("/", AtendimentoController.listar)
atendimentoRoute.get("/user", AtendimentoController.listarEmAtendimentoUser)
atendimentoRoute.get("/atendidos", AtendimentoController.listarAtendidosUser)

atendimentoRoute.get("/atendidosgeral", AtendimentoController.atendidosGeral)



atendimentoRoute.post("/", AtendimentoController.criar)
atendimentoRoute.put("/", AtendimentoController.fimAtendimento)




export default atendimentoRoute