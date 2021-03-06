import Sequelize from 'sequelize'

export default (sequelize) => {
  const Section = sequelize.define('section', {
    // attributes
    id: { type: Sequelize.UUID, primaryKey: true, autoIncrement: true },
    page_id: { type: Sequelize.UUID },
    section_type: { type: Sequelize.STRING },
    content: { type: Sequelize.STRING },
    secondary_content: { type: Sequelize.STRING },
    additional_info: { type: Sequelize.STRING },
    is_trashed: { type: Sequelize.INTEGER },
  }, { timestamps: false })

  return Section
}
