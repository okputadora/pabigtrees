import Sequelize from 'sequelize'

export default (sequelize) => {
  const News = sequelize.define('news', {
    // attributes
    i_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    news_title: { type: Sequelize.STRING },
    news_body: { type: Sequelize.STRING },
    f_display: { type: Sequelize.INTEGER },
    create_date: { type: Sequelize.TEXT },
    last_update: { type: Sequelize.TEXT },
  }, { timestamps: false })

  return News
}
