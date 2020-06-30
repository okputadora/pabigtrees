import Sequelize from 'sequelize'

export default (sequelize) => {
  const NewsImages = sequelize.define('newsimages', {
    // attributes
    i_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    k_news: { type: Sequelize.STRING },
    img_location: { type: Sequelize.STRING },
    f_active: { type: Sequelize.INTEGER },
    create_date: { type: Sequelize.TEXT },
  }, { timestamps: false })

  return NewsImages
}
