import { NextFunction, Request, Response } from "express";
import RequerenteService from "../Services/requerente.service.js";
import { verifyToken } from "../jwt/jwt.js";


abstract class RequerenteController {
    public static async listar(req: Request, res: Response, next:NextFunction) {
        try {
            const {status, msg} = await RequerenteService.listar();
            res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }
    public static async listarEmAtendimentoUser(req: Request, res: Response, next:NextFunction) {
        try {
            const userId = verifyToken(req,res)
            const hBody = req.body
            const body = {...hBody, userId}
            const {status, msg} = await RequerenteService.listarEmAtendimentoUser(body);
            res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }
    
    public static async listarAtendidos(req: Request, res: Response, next:NextFunction) {
        try {
            const {status, msg} = await RequerenteService.listarAtendidos();
            res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }
    public static async listarGeral(req: Request, res: Response, next:NextFunction) {
        try {
            const {status, msg} = await RequerenteService.listarGeral();
            res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }
    public static async listarPrioridade(req: Request, res: Response, next:NextFunction) {
        try {
            const {status, msg} = await RequerenteService.listarPrioridade();
            res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }

    public static async criar(req: Request, res: Response, next:NextFunction) {
        try {
            const userId = verifyToken(req,res)
            const hBody = req.body
            const body = {...hBody, userId}
            const {status, msg} = await RequerenteService.criar(body);
            res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }
}

export default RequerenteController;