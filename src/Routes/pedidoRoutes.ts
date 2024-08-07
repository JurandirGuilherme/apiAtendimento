import Express from "express";
import pedidoController from "../Controllers/pedido.controller";
const pedidoRoute = Express();

pedidoRoute.post("/", pedidoController.criar);
pedidoRoute.get("/", pedidoController.listar);
pedidoRoute.get("/emfila", pedidoController.listarEmFila);
pedidoRoute.post("/andamento", pedidoController.andamento);
pedidoRoute.put("/impresso", pedidoController.imprimir);
pedidoRoute.post("/impressos", pedidoController.listarImpressos);
pedidoRoute.post("/consultar", pedidoController.consultar);
pedidoRoute.get("/script", pedidoController.script);



export default pedidoRoute;
