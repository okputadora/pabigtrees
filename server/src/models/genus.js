import Sequelize from 'sequelize'

export default (sequelize) => {
  const Genus = sequelize.define('Genus', {
    // attributes
    id: { type: Sequelize.UUID, primaryKey: true },
    t_genus: { type: Sequelize.STRING },
    t_common: { type: Sequelize.STRING },
  }, { timestamps: false })

  // Tree.associate = function (models) {
  //   models.Task.belongsTo(models.T, {
  //     onDelete: 'CASCADE',
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   })
  // }
  return Genus
}
