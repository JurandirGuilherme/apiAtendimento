import Express from "express";
import RequerenteController from "../Controllers/requerente.controller";
const requerenteRoute = Express();


requerenteRoute.get("/", RequerenteController.listar)
requerenteRoute.get("/atendidos", RequerenteController.listarAtendidos)
requerenteRoute.get("/preferencial", RequerenteController.listarPrioridade)
requerenteRoute.get("/geral", RequerenteController.listarGeral)

requerenteRoute.get("/todos", RequerenteController.listarTodos)



requerenteRoute.post("/", RequerenteController.criar)


export default requerenteRoute