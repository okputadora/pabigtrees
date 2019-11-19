import Sequelize from 'sequelize'

export default (sequelize) => {
  const Tree = sequelize.define('Tree', {
    // attributes
    id: { type: Sequelize.STRING, primaryKey: true },
    k_species: { type: Sequelize.STRING },
    k_county: { type: Sequelize.INTEGER },
    k_technique: { type: Sequelize.INTEGER },
    d_nominated: { type: Sequelize.STRING },
    d_last_measured: { type: Sequelize.STRING },
    i_circum_inchs: { type: Sequelize.DOUBLE },
    i_height_feet: { type: Sequelize.DOUBLE },
    i_spread_feet: { type: Sequelize.DOUBLE },
    i_points: { type: Sequelize.DOUBLE },
    t_address: { type: Sequelize.STRING },
    t_gps: { type: Sequelize.STRING },
    t_measure_crew: { type: Sequelize.STRING },
    t_original_nominator: { type: Sequelize.STRING },
    t_comments: { type: Sequelize.STRING },
    f_national_champ: { type: Sequelize.INTEGER },
    f_retired: { type: Sequelize.INTEGER },
    f_penn_charter: { type: Sequelize.INTEGER },
    f_multistemmed: { type: Sequelize.INTEGER },
    f_tallest: { type: Sequelize.INTEGER },
    k_user_added: { type: Sequelize.STRING },
    d_added: { type: Sequelize.STRING },
  }, { timestamps: false })

  // Tree.associate = function (models) {
  //   models.Task.belongsTo(models.T, {
  //     onDelete: 'CASCADE',
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   })
  // }
  return Tree
}
