import  Express from "express";
import userRoute from "./userRoutes";

const router = Express()

router.use('/user', userRoute)



export default router;