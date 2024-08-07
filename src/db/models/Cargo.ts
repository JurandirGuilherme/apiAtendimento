import {Model} from 'sequelize'
import { DataTypes } from 'sequelize'
import sequelize from '../conn'


class Cargo extends Model {
    declare id: string
    declare nome: string
}

Cargo.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull:false
  },
  nome:{
    type: DataTypes.STRING,
    allowNull:false
  }
}, {
    tableName: 'Cargos',
    timestamps: false,
    underscored: true,
    sequelize
})


export default Cargo