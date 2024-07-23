import { NextFunction, Request, Response } from "express";
import CargoService from "../Services/cargo.service.js";
import { verifyToken } from "../jwt/jwt.js";


abstract class CargoController {
    public static async listar(req: Request, res: Response, next:NextFunction) {
        try {
            const {status, msg} = await CargoService.listar();
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
            const {status, msg} = await CargoService.criar(body);
            res.status(status).json(msg)
        } catch (error) {
            next(error)
        }
    }
}

export default CargoController;