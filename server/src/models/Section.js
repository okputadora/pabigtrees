import Sequelize from 'sequelize'

export default (sequelize) => {
  const Page = sequelize.define('Page', {
    // attributes
    id: { type: Sequelize.UUID, primaryKey: true },
    layout: { type: Sequelize.STRING, foreignKey: true },
    component: { type: Sequelize.STRING },
  }, { timestamps: false })

  // Tree.associate = function (models) {
  //   models.Task.belongsTo(models.T, {
  //     onDelete: 'CASCADE',
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   })
  // }
  return Page
}
