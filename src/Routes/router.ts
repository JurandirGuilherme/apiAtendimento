import Express from "express";
import userRoute from "./userRoutes";
import cargoRoute from "./cargoRoutes";
import pedidoRoute from "./pedidoRoutes";
import entregaRoute from "./entregaRoutes";

import requerenteRoute from "./requerenteRoutes";
import atendimentoRoute from "./atendimentoRoutes";

const router = Express();

router.use("/user", userRoute);
router.use("/cargo", cargoRoute);
router.use("/pedido", pedidoRoute);
router.use("/entrega", entregaRoute);
router.use("/requerente", requerenteRoute);
router.use("/atendimento", atendimentoRoute);

export default router;
