import Express from "express";
import RequerenteController from "../Controllers/requerente.controller";
const requerenteRoute = Express();


requerenteRoute.get("/", RequerenteController.listar)
requerenteRoute.get("/atendidos", RequerenteController.listarAtendidos)
requerenteRoute.get("/preferencial", RequerenteController.listarPrioridade)
requerenteRoute.get("/prioridade", RequerenteController.listarPrioridadeLei)

requerenteRoute.get("/geral", RequerenteController.listarGeral)

requerenteRoute.get("/todos", RequerenteController.listarTodos)



requerenteRoute.post("/", RequerenteController.criar)

requerenteRoute.post('/dashboard', RequerenteController.qtdDashboard)


export default requerenteRoute