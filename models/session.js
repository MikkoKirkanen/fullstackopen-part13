import { Model, DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../util/db.js'

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("NOW() + INTERVAL '1 hour'"),
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'session',
  }
)

export default Session
