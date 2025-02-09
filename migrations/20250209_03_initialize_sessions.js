import { DataTypes, Sequelize } from 'sequelize'

const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('sessions', {
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
  })
}

const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('sessions')
}

export { up, down }
