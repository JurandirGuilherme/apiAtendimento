import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../conn";

class Atendimento extends Model {
  declare id: string;
  declare userId: string;
  declare requerenteId: string;
  declare inicio: Date
  declare fim: Date
}

Atendimento.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    requerenteId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Requerentes",
        key: "id",
      },
    },

    inicio: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    fim: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Atendimentos",
    timestamps: true,
    underscored: true,
    sequelize,
  }
);

export default Atendimento;
