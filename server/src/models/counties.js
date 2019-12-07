import Sequelize from 'sequelize'

export default (sequelize) => {
  const County = sequelize.define('County', {
    // attributes
    id: { type: Sequelize.UUID, primaryKey: true },
    county: { type: Sequelize.STRING },
  }, { timestamps: false })

  return County
}
