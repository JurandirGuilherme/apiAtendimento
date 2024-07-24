import Express, { NextFunction, Request, Response } from "express";
import cors from 'cors'
import router from "./Routes/router";

const app = Express()
app.use(Express.json())
app.use(cors())
app.use(router)
app.use((err:any, req:Request,res: Response,next:NextFunction)=>{
    console.log(err)
    return res.status(400).json({msg: 'error'})
})


app.listen(3333, ()=>{
    console.log('Servidor Rodando!')
})