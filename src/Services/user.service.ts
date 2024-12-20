import { ModelStatic, Op } from "sequelize";
import User from "../db/models/User";
import md5 from "md5";
import resp from "../utils/resp";
import { sign } from "../jwt/jwt";
import Cargo from "../db/models/Cargo";
import UserCargo from "../db/models/UserCargo";
import respM from "../utils/respM";
import IUser from "../Interfaces/IUser";
import Atendimento from "../db/models/Atendimento";
import Requerente from "../db/models/Requerente";

UserCargo.associations;
abstract class UserService {
  public static model: ModelStatic<User> = User;

  public static async listarUsuarios() {
    const usuarios = await this.model.findAll({
      include: [{ model: Cargo, as: "cargos" }],
      attributes: { exclude: ["senha"] },
    });
    return resp(200, usuarios);
  }
  public static async getUser(body: { userId: string }) {
    const { userId } = body;
    const usuario = await this.model.findOne({
      where: { id: userId },
      attributes: { exclude: ["senha"] },
    });
    return resp(200, usuario);
  }

  public static async getUserAtendimento({ inicioDt, fimDt }: {inicioDt:any, fimDt:any}) {
    const usuarios = await User.findAll();
    const userArray = usuarios.map(async ({ id, nome }) => {
      const atendimento:Array<any> = await Atendimento.findAll({
        include: { model: Requerente, as: "requerente" },
        where: {
          userId: id,
          fim: { [Op.not]: null },
          createdAt: { [Op.between]: [new Date(inicioDt), new Date(fimDt)] },
        },
        attributes: { exclude: ["senha"] },
      });
      let countPrefencial = 0;
      let countGeral = 0;
      let countPrioridade = 0;

      atendimento.map((data) => {
        if (data.requerente.preferencial) {
          countPrefencial++;
        } else if (data.requerente.prioridadelei) {
          countPrioridade++;
        } else {
          countGeral++;
        }
      });

      console.log(countPrefencial);
      return {
        id,
        nome,
        preferencial: countPrefencial,
        geral: countGeral,
        prioridade: countPrioridade,
        atendidos: atendimento.length,
      };
    });

    const atendidosUser = await Promise.all(userArray);

    return resp(
      200,
      atendidosUser.filter((data) => data.atendidos > 0)
    );
  }


  public static async getUserSolicitantes({ inicioDt, fimDt }) {
    console.log(inicioDt, fimDt);
    const usuarios = await User.findAll();
    const userArray = usuarios.map(async ({ id, nome }) => {
      const atendimento = await Requerente.findAll({
        where: {
          userId: id,
          createdAt: { [Op.between]: [new Date(inicioDt), new Date(fimDt)] },
        },
        attributes: { exclude: ["senha"] },
      });
      const preferencial = await Requerente.findAll({
        where: {
          userId: id,
          preferencial: true,
          createdAt: { [Op.between]: [inicioDt, fimDt] },
        },
        attributes: { exclude: ["senha"] },
      });
      console.log(new Date(inicioDt));
      const geral = await Requerente.findAll({
        where: {
          userId: id,
          preferencial: false,
          prioridadelei: false,
          createdAt: { [Op.between]: [new Date(inicioDt), new Date(fimDt)] },
        },
        attributes: { exclude: ["senha"] },
      });
      const prioridade = await Requerente.findAll({
        where: {
          userId: id,
          prioridadelei: true,
          createdAt: { [Op.between]: [inicioDt, fimDt] },
        },
        attributes: { exclude: ["senha"] },
      });

      return {
        id,
        nome,
        preferencial: preferencial.length,
        geral: geral.length,
        prioridade: prioridade.length,
        total: atendimento.length,
      };
    });
    const atendidosUser = await Promise.all(userArray);
    return resp(
      200,
      atendidosUser.filter((data) => data.total > 0)
    );
  }

  public static async criarUsuario(body: IUser) {
    const { usuario, nome, senha, ativo } = body;

    // Verificação
    const dbUser = await this.model.findOne({ where: { usuario: usuario } });
    if (dbUser) return respM(401, "Usuário já existe.");

    const user = await this.model.create({
      usuario: usuario.toLowerCase(),
      nome,
      senha: md5(senha!),
      ativo,
    });

    const {
      senha: _,
      nome: sNome,
      id: sId,
      usuario: sUsuario,
      ativo: sAtivo,
    } = user;

    user.save();
    const userCargo = body.cargo!.map((e) => ({
      userId: user.id,
      cargoId: e,
    }));
    const userr = await UserCargo.bulkCreate(userCargo);
    const userrr = await User.findOne({
      where: { id: sId },
      include: { model: Cargo, as: "cargos" },
    });
    return resp(200, userrr);
  }

  public static async login(body: { usuario: string; senha: string }) {
    const hashPassword = md5(body.senha);
    const user = await this.model.findOne({
      include: { model: Cargo, as: "cargos", attributes: ["id", "nome"] },
      where: {
        usuario: body.usuario,
        senha: hashPassword,
      },
    });
    if (!user) return resp(404, "Usuario ou Senha Incorreto.");
    const { id, usuario, nome, cargos, ativo } = user;
    if (!ativo) return resp(400, "Usuário bloqueado.");
    console.log(user);
    const token = await sign({ id, usuario, nome });
    return resp(200, { id, usuario, token, nome, cargos });
  }
}

export default UserService;
