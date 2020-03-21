import Sequelize from 'sequelize'

export default (sequelize) => {
  const TreeImage = sequelize.define('treeImage', {
    // attributes
    id: { type: Sequelize.UUID, primaryKey: true, autoIncrement: true },
    k_tree: { type: Sequelize.UUID },
    img_location: { type: Sequelize.INTEGER },
    f_active: { type: Sequelize.BOOLEAN },
  }, { timestamps: false })

  // Tree.associate = function (models) {
  //   models.Task.belongsTo(models.T, {
  //     onDelete: 'CASCADE',
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   })
  // }
  return TreeImage
}
