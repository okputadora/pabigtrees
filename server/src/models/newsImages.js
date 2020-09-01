import Sequelize from 'sequelize'

export default (sequelize) => {
  const NewsImages = sequelize.define('newsimages', {
    // attributes
    i_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    k_news: { type: Sequelize.STRING },
    image_location: { type: Sequelize.STRING },
    f_active: { type: Sequelize.INTEGER },
    create_date: { type: Sequelize.TEXT },
    isTest: { type: Sequelize.INTEGER },
  }, { timestamps: false })

  return NewsImages
}
