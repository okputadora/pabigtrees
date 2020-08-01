import Sequelize from 'sequelize'

export default (sequelize) => {
  const User = sequelize.define('user', {
    // attributes
    id: { type: Sequelize.UUID, primaryKey: true, autoIncrement: true },
    username: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
  }, { timestamps: false })

  return User
}
