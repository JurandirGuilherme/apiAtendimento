import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import "dotenv/config";
import { Request, Response } from "express";

const secret = process.env.JWT_SECRET as string;

const sign = (
  payload: { id: string; usuario: string; nome: string },
  expiresIn = "8h"
) => {
  console.log(payload);
  const jwtConfig: SignOptions = {
    algorithm: "HS256",
    expiresIn,
  };
  return jwt.sign(payload, secret, jwtConfig);
};

interface IJwtPayload extends JwtPayload{
  id:string;
}
const verifyToken = (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization");
    console.log(token)
    if (!token) return res.status(401).json({ msg: "Não autoriazado" });
    const decoded = jwt.verify(token, secret) as IJwtPayload;

    const userId = decoded.id!

    return (res.locals.user = decoded), userId;
  } catch (error) {
    console.log(error);
    return (
      res.status(401).json({ msg: "Erro na Verificação do Token" }),
      (res.locals.user = null)
    );
  }
};

export { sign, verifyToken };
