import Express from "express";
import RequerenteController from "../Controllers/requerente.controller";
const requerenteRoute = Express();


requerenteRoute.get("/", RequerenteController.listar)
requerenteRoute.post("/", RequerenteController.criar)


export default requerenteRoute