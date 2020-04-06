import Sequelize from 'sequelize'

export default (sequelize) => {
  const Nomination = sequelize.define('Nomination', {
    // attributes
    id: { type: Sequelize.UUID, primaryKey: true },
    speciesId: { type: Sequelize.UUID },
    speciesName: { type: Sequelize.STRING },
    commonName: { type: Sequelize.STRING },
    genusId: { type: Sequelize.UUID },
    genusName: { type: Sequelize.STRING },
    county: { type: Sequelize.UUID },
    nominator: { type: Sequelize.STRING },
    address: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    landOwner: { type: Sequelize.STRING },
    ownerAddress: { type: Sequelize.STRING },
    ownerPhone: { type: Sequelize.STRING },
    ownerEmail: { type: Sequelize.STRING },
    locationOfTree: { type: Sequelize.STRING },
    lon: { type: Sequelize.FLOAT },
    lat: { type: Sequelize.FLOAT },
    measuringCrew: { type: Sequelize.STRING },
    dateMeasured: { type: Sequelize.STRING },
    circumference: { type: Sequelize.STRING },
    height: { type: Sequelize.FLOAT },
    spread1: { type: Sequelize.FLOAT },
    spread2: { type: Sequelize.FLOAT },
    comments: { type: Sequelize.STRING },
    // add genusName genusId fields etc...if genusName we know to create new genus during approbal provess
  }, { timestamps: false })

  // Tree.associate = function (models) {
  //   models.Task.belongsTo(models.T, {
  //     onDelete: 'CASCADE',
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   })
  // }
  return Nomination
}
