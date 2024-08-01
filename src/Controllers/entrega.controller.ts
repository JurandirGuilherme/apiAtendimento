import { NextFunction, Request, Response } from "express";
import EntregaService from "../Services/entrega.service.js";
import { verifyToken } from "../jwt/jwt.js";


abstract class EntregaController {
    public static async listar(req: Request, res: Response, next:NextFunction) {
        try {
            const {status, msg} = await EntregaService.listar();
            res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }
    public static async criar(req: Request, res: Response, next:NextFunction) {
        try {
            // const userId = verifyToken(req,res)
            // const hBody = req.body
            // const body = {...hBody, userId}
            const {status, msg} = await EntregaService.criar(req.body);
            res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }
}

export default EntregaController;