import Express from "express";
import pedidoController from "../Controllers/pedido.controller";
const pedidoRoute = Express();

pedidoRoute.post("/", pedidoController.criar);
pedidoRoute.get("/", pedidoController.listar);
pedidoRoute.get("/emfila", pedidoController.listarEmFila);
pedidoRoute.put("/impresso", pedidoController.impresso);
pedidoRoute.get("/impressos", pedidoController.listarImpressos);

export default pedidoRoute;
