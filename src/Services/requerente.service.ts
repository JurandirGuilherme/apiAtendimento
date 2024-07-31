import { ModelStatic, Op } from "sequelize";
import Requerente from "../db/models/Requerente";
import resp from "../utils/resp";
import User from "../db/models/User";
import UserCargo from "../db/models/UserCargo";
import respM from "../utils/respM";
import Atendimento from "../db/models/Atendimento";
// import schema from "./validations/schema";

abstract class RequerenteService {
  static model: ModelStatic<Requerente> = Requerente;

  public static async listar() {
    const requerentes = await this.model.findAll({
      include: {
        model: User,
        as: "usuario",
        attributes: { exclude: ["senha"] },
      },
    });
    return resp(200, requerentes);
  }

  public static async listarTodos() {
    const requerentes = await this.model.findAll({
      include: {
        model: User,
        as: "usuario",
        attributes: { exclude: ["senha"] },
        order: [["createdAt", "ASC"]],
      },
    });
    return resp(200, requerentes);
  }

  public static async listarAtendidos() {
    const requerentes = await this.model.findAll({
      include: {
        model: User,
        as: "usuario",
        attributes: ["id", "nome"],
      },
      where: { atendido: true },
      attributes: {
        exclude: ["preferencial", "userId", "updatedAt", "atendido"],
      },
    });
    return resp(200, requerentes);
  }
  public static async listarGeral() {
    const requerentes = await this.model.findAll({
      include: {
        model: User,
        as: "usuario",
        attributes: ["id", "nome"],
      },
      where: { atendido: false, preferencial: false, prioridadelei:false },
      attributes: {
        exclude: ["preferencial", "userId", "updatedAt", "atendido"],
      },
      order: [["createdAt", "ASC"]],
    });
    return resp(200, requerentes);
  }
  public static async listarPrioridade() {
    const requerentes = await this.model.findAll({
      include: {
        model: User,
        as: "usuario",
        attributes: ["id", "nome"],
      },
      where: { atendido: false, preferencial: true },
      attributes: {
        exclude: ["preferencial", "userId", "updatedAt", "atendido"],
      },
      order: [["createdAt", "ASC"]],
    });
    return resp(200, requerentes);
  }
  public static async listarPrioridadeLei() {
    const requerentes = await this.model.findAll({
      include: {
        model: User,
        as: "usuario",
        attributes: ["id", "nome"],
      },
      where: { atendido: false, prioridadelei: true },
      attributes: {
        exclude: ["preferencial", "userId", "updatedAt", "atendido"],
      },
      order: [["createdAt", "ASC"]],
    });
    return resp(200, requerentes);
  }

  public static async gtdDashboard({ inicioDt, fimDt }) {
    console.log(inicioDt)
    const preferencial = await this.model.findAll({
      include: {
        model: User,
        as: "usuario",
        attributes: ["id", "nome"],
      },
      where: {
        atendido: false,
        preferencial: true,
        createdAt: {
          [Op.between]: [new Date(inicioDt), new Date(fimDt)],
        },
      },
      attributes: {
        exclude: ["preferencial", "userId", "updatedAt", "atendido"],
      },
      order: [["createdAt", "ASC"]],
    });

    const geral = await this.model.findAll({
      include: {
        model: User,
        as: "usuario",
        attributes: ["id", "nome"],
      },
      where: {
        atendido: false,
        preferencial: false,
        prioridadelei: false,
        createdAt: {
          [Op.between]: [new Date(inicioDt), new Date(fimDt)],
        },
      },
      attributes: {
        exclude: ["preferencial", "userId", "updatedAt", "atendido"],
      },
      order: [["createdAt", "ASC"]],
    });
    const total = await this.model.findAll({
      include: {
        model: User,
        as: "usuario",
        attributes: ["id", "nome"],
      },
      where: {
        atendido: false,
        createdAt: {
          [Op.between]: [new Date(inicioDt), new Date(fimDt)],
        },
      },
      attributes: {
        exclude: ["preferencial", "userId", "updatedAt", "atendido"],
      },
      order: [["createdAt", "ASC"]],
    });

    const prioridade = await this.model.findAll({
      include: {
        model: User,
        as: "usuario",
        attributes: ["id", "nome"],
      },
      where: {
        atendido: false,
        prioridadelei:true,
        createdAt: {
          [Op.between]: [new Date(inicioDt), new Date(fimDt)],
        },
      },
      attributes: {
        exclude: ["preferencial", "userId", "updatedAt", "atendido"],
      },
      order: [["createdAt", "ASC"]],
    });
    console.log(preferencial)


    return resp(200, {
      preferencial: preferencial.length,
      geral: geral.length,
      total: total.length,
      prioridade: prioridade.length
    });
  }

  public static async criar(body: {
    nome: string;
    preferencial: boolean;
    via: number;
    userId: string;
    cin: boolean;
    prioridadelei:boolean;
  }) {
    const { userId, preferencial } = body;
    const { cargoId } = await UserCargo.findOne({ where: { userId } });
    if (preferencial == true && cargoId != 1)
      return respM(401, "Não há autorização para preferencial.");
    const Requerente = await this.model.create(body);
    Requerente.save();
    return resp(200, Requerente);
  }
}

export default RequerenteService;
