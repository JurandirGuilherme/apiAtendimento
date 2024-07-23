import Express from "express";
import CargoController from "../Controllers/cargo.controller";
const cargoRoute = Express();


cargoRoute.get("/", CargoController.listar)
cargoRoute.post("/", CargoController.criar)


export default cargoRoute