import {Model} from 'sequelize'
import { DataTypes } from 'sequelize'
import sequelize from '../conn'
import User from './User'
import Atendimento from './Atendimento'


class Requerente extends Model {
    declare id: string
    declare nome: string
    declare via: number
    declare cin: boolean
    declare atendido: boolean
    declare preferencial: boolean
}

Requerente.init({
  id:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull:false,
    primaryKey:true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  preferencial:{
    type:DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull:false
  },
  via:{
    type:DataTypes.INTEGER,
    defaultValue:1,
    allowNull:false
  },
  cin:{
    type:DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull:false
  },
  atendido:{
    type:DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull:false
  },
  userId:{
    type: DataTypes.UUID,
    references:{
      model: 'Users',
      key: 'id'
    }
  }
}, {
    tableName: 'Requerentes',
    timestamps: true,
    underscored: true,
    sequelize
})

Requerente.belongsTo(User,{
  foreignKey:'userId',
  as:'usuario'
})

Atendimento.belongsTo(Requerente,{
  foreignKey:'requerenteId',
  as: 'requerente'
})

User.hasMany(Requerente, {
  foreignKey:'userId',
  as:'usuarios'
})


export default Requerente