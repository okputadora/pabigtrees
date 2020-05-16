import Sequelize from 'sequelize'

export default (sequelize) => {
  const Species = sequelize.define('Species', {
    // attributes
    id: { type: Sequelize.UUID, primaryKey: true },
    k_genus: { type: Sequelize.UUID },
    t_species: { type: Sequelize.STRING },
    t_common: { type: Sequelize.STRING },
    test: { type: Sequelize.TINYINT },
  }, { timestamps: false })

  // Tree.associate = function (models) {
  //   models.Task.belongsTo(models.T, {
  //     onDelete: 'CASCADE',
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   })
  // }
  return Species
}
