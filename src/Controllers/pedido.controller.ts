import { NextFunction, Request, Response } from "express";
import PedidoService from "../Services/pedido.service.js";
import { verifyToken } from "../jwt/jwt.js";


abstract class PedidoController {
    public static async listar(req: Request, res: Response, next:NextFunction) {
        try {
            const {status, msg} = await PedidoService.listar();
            res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }
    public static async listarEmFila(req: Request, res: Response, next:NextFunction) {
        try {
            const {status, msg} = await PedidoService.listarEmFila();
            res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }
    public static async andamento(req: Request, res: Response, next:NextFunction) {
        try {
            const {status, msg} = await PedidoService.andamento(req.body);
            res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }
    public static async listarImpressos(req: Request, res: Response, next:NextFunction) {
        try {
            const {status, msg} = await PedidoService.listarImpressos(req.body);
            res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }

    public static async imprimir(req: Request, res: Response, next:NextFunction) {
        try {
            const userId = verifyToken(req,res)
            if (!userId) throw new Error;
            const hBody = req.body
            const body = {...hBody, userId}
            const {status, msg} = await PedidoService.imprimir(body);
            res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }
    public static async script(req: Request, res: Response, next:NextFunction){
        try {
            const {status, msg} = await PedidoService.script();
            res.status(status).json(msg)
            
        } catch (error) {
            next(error)
            
        }
    }

    public static async consultar(req: Request, res: Response, next:NextFunction) {
        try {
            // const userId = verifyToken(req,res)
            const body = req.body
            // const body = {...hBody, userId}
            const {status, msg} = await PedidoService.consultar(body);
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
            const {status, msg} = await PedidoService.criar(body);
            res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }
}

export default PedidoController;