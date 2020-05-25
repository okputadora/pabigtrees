import Sequelize from 'sequelize'

export default (sequelize) => {
  const Page = sequelize.define('page', {
    // attributes
    id: { type: Sequelize.UUID, primaryKey: true, autoIncrement: true },
    title: { type: Sequelize.STRING },
  }, { timestamps: false })

  return Page
}
