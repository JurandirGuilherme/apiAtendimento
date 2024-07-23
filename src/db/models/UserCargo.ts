import {Model} from 'sequelize'
import { DataTypes } from 'sequelize'
import sequelize from '../conn'
import User from './User'
import Cargo from './Cargo'


class UserCargo extends Model {
    declare userId: string
    declare cargoId: string
}

UserCargo.init({
  userId: {
    type: DataTypes.UUID,
    references:{
      model: 'Users',
      key: 'id'
    },
    allowNull:false,
    onUpdate: 'CASCADE',
    primaryKey:true,
    unique:false,
    onDelete: 'CASCADE'
  },
  cargoId: {
    type: DataTypes.INTEGER,
    primaryKey:true,
    unique:false,
    references:{
      model: 'Cargos',
      key: 'id'
    },
    allowNull:false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
}, {
    tableName: 'User_cargos',
    timestamps: true,
    underscored: true,
    sequelize
})

User.belongsToMany(Cargo, {
  through: {model: UserCargo},
  foreignKey: 'userId',
  otherKey: 'cargoId',
  as:'Cargos'
})


Cargo.belongsToMany(User, {
  through: {model: UserCargo},
  foreignKey: 'cargoId',
  otherKey: 'userId',
  as:'usuarios'
})

export default UserCargo