import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../conn";
import User from "./User";
import Entrega from "./Entrega";

class Pedido extends Model {
  declare numero: number;
  declare solicitanteId: string;
  declare operadorId: string | null;
  declare entregaCode: number;
  declare impresso: boolean;
}

Pedido.init(
  {
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    solicitanteId: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: false,
    },
    operadorId: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: true,
    },
    impresso: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    dtImpressao: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    postoOrigem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entregaCode: {
      type: DataTypes.UUID,
      references: {
        model: "Entregas",
        key: "code",
      },
      allowNull: false,
    },
  },
  {
    tableName: "Pedidos",
    timestamps: true,
    underscored: true,
    sequelize,
  }
);

Pedido.belongsTo(User, {
  foreignKey: {
    name: "operadorId",
    allowNull: true,
  },
  as: "operador",
});

Pedido.belongsTo(User, {
  foreignKey: "solicitanteId",
  as: "solicitante",
});

// Pedido.hasOne(Entrega,{
//   foreignKey:'entregaCode',
//   as:'entrega'
// })

// Entrega.belongsTo(Pedido,{
//   foreignKey:'entregaCode',
//   as:'entrega'
// })

export default Pedido;
