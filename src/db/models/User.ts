import {Model} from 'sequelize'
import { DataTypes } from 'sequelize'
import sequelize from '../conn'
import Cargo from './Cargo'
import UserCargo from './UserCargo'
import Atendimento from './Atendimento'


class User extends Model {
    declare id: string
    declare usuario: string
    declare nome: string
    declare descricao: string
    declare senha: string
    declare ativo: boolean
    declare cargos: number
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false,
      },
      usuario:{
        type:DataTypes.STRING,
        unique: true,
        allowNull:false
      },
      nome:{
        type:DataTypes.STRING,
        allowNull:false
      },
      senha:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      ativo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
      }
}, {
    tableName: 'Users',
    timestamps: true,
    underscored: true,
    sequelize
})

Atendimento.belongsTo(User, {
  foreignKey: 'userId',
  as:'usuario'
})

export default User