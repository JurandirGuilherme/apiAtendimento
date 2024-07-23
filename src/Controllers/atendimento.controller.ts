import { NextFunction, Request, Response } from "express";
import AtendimentoService from "../Services/atendimento.service.js";
import { verifyToken } from "../jwt/jwt.js";


abstract class AtendimentoController {
    public static async listar(req: Request, res: Response, next:NextFunction) {
        try {
            const {status, msg} = await AtendimentoService.listar();
            return res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }
    public static async criar(req: Request, res: Response, next:NextFunction) {
        try {
            const userId = verifyToken(req,res)
            const hBody = req.body
            const body = {...hBody, userId}
            const {status, msg} = await AtendimentoService.criar(body);
            return res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }
    public static async fimAtendimento(req: Request, res: Response, next:NextFunction){
        try {
            const userId = verifyToken(req,res)
            const hBody = req.body
            const body = {...hBody, userId}
            const {status, msg} = await AtendimentoService.fimAtendimento(body)
            return res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }
}

export default AtendimentoController;