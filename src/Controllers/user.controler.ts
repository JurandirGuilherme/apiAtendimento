import { NextFunction, Request, Response } from "express";
import UserService from "../Services/user.service.js";
import { verifyToken } from "../jwt/jwt.js";


abstract class UserController {
    public static async criarUsuario(req: Request, res: Response, next:NextFunction) {
        try{
            const {status, msg} = await UserService.criarUsuario(req.body)
            return res.status(status).json(msg)
        }catch(error){
            next(error)
        }
    }
    public static async login(req: Request, res:Response, next:NextFunction) {
        try {
            const {status, msg} = await UserService.login(req.body)
            return res.status(status).json(msg)

        } catch (error) {
            next(error)
        }
    }
    public static async listar(req: Request, res:Response, next:NextFunction) {
        try {
            const {status, msg} = await UserService.listarUsuarios()
            return res.status(status).json(msg)

        } catch (error) {
            next(error)
        }
    }
    public static async getUser(req: Request, res:Response, next:NextFunction) {
        try {
            const userId = verifyToken(req,res)
            const hBody = req.body
            const body = {...hBody, userId}
            const {status, msg} = await UserService.getUser(body)
            return res.status(status).json(msg)

        } catch (error) {
            next(error)
        }
    }
    public static async getUserAtendimento(req: Request, res:Response, next:NextFunction) {
        try {
            // const userId = verifyToken(req,res)
            // const hBody = req.body
            // const body = {...hBody, userId}
            const userId = 'bf1d745b-d349-4209-abc6-38b827d5ebd7'
            const body = {userId}

            const {status, msg} = await UserService.getUserAtendimento(body)
            return res.status(status).json(msg)

        } catch (error) {
            next(error)
        }
    }
    public static async getUserSolicitantes(req: Request, res:Response, next:NextFunction) {
        try {
            // const userId = verifyToken(req,res)
            // const hBody = req.body
            // const body = {...hBody, userId}
            const userId = 'bf1d745b-d349-4209-abc6-38b827d5ebd7'
            const body = {userId}

            const {status, msg} = await UserService.getUserSolicitantes(body)
            return res.status(status).json(msg)

        } catch (error) {
            next(error)
        }
    }
    
}

export default UserController;