import {Model} from 'sequelize'
import { DataTypes } from 'sequelize'
import sequelize from '../conn'
import User from './User'


class Requerente extends Model {
    declare id: string
    declare nome: string
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

User.hasMany(Requerente)


export default Requerente