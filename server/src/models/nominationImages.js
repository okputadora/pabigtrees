import Sequelize from 'sequelize'

export default (sequelize) => {
  const NominationImage = sequelize.define('nominationImage', {
    // attributes
    id: { type: Sequelize.UUID, primaryKey: true, autoIncrement: true },
    nominationId: { type: Sequelize.UUID },
    location: { type: Sequelize.STRING },
  }, { timestamps: false })

  return NominationImage
}
