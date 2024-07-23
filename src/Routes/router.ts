import  Express from "express";
import userRoute from "./userRoutes";
import cargoRoute from "./cargoRoutes";
import requerenteRoute from "./requerenteRoutes";
import atendimentoRoute from "./AtendimentoRoutes";

const router = Express()

router.use('/user', userRoute)
router.use('/cargo', cargoRoute)
router.use('/requerente', requerenteRoute)
router.use('/atendimento', atendimentoRoute)



export default router;