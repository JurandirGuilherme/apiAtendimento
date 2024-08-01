import {Model} from 'sequelize'
import { DataTypes } from 'sequelize'
import sequelize from '../conn'
import Pedido from './Pedido'

class Entrega extends Model {
    declare code: number
    declare nome: string
}

Entrega.init({
      code:{
        type: DataTypes.UUID,
        allowNull:false,
        primaryKey:true
      },
      nome:{
        type:DataTypes.STRING,
        allowNull:false
      }
}, {
    tableName: 'Entregas',
    timestamps: true,
    underscored: true,
    sequelize
})

Pedido.belongsTo(Entrega, {
  foreignKey:'entregaCode',
  as: 'entrega'
})

// Entrega.hasMany(Pedido)



export default Entrega