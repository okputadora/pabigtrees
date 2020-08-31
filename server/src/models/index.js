
import Sequelize from 'sequelize'
import trees from './trees'
import species from './species'
import counties from './counties'
import genus from './genus'
import treeImages from './treeImages'
import nominations from './nominations'
import nominationImages from './nominationImages'
import news from './news'
import newsImages from './newsImages'
import pages from './pages'
import sections from './sections'
import users from './users'
// const env = process.env.NODE_ENV || 'development'
// const config = require(`${__dirname}/../config/config.js`)[env]
const db = {}

const sequelize = new Sequelize(process.env.JAWSDB_URL,
  {
    dialect: 'mysql',
    logging: false,
  })

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

db.Sequelize = Sequelize
db.sequelize = sequelize

db.species = species(sequelize, Sequelize)
db.trees = trees(sequelize, Sequelize)
db.counties = counties(sequelize, Sequelize)
db.genus = genus(sequelize, Sequelize)
db.treeImages = treeImages(sequelize, Sequelize)
db.nominations = nominations(sequelize, Sequelize)
db.nominationImages = nominationImages(sequelize, Sequelize)
db.news = news(sequelize, Sequelize)
db.newsImages = newsImages(sequelize, Sequelize)
db.pages = pages(sequelize, Sequelize)
db.sections = sections(sequelize, Sequelize)
db.users = users(sequelize, Sequelize)
// Relations
db.trees.belongsTo(db.species, { foreignKey: 'k_species' })
db.trees.belongsTo(db.counties, { foreignKey: 'k_county' })
db.species.belongsTo(db.genus, { foreignKey: 'k_genus' })
db.treeImages.belongsTo(db.trees, { foreignKey: 'k_tree' })
db.nominations.belongsTo(db.species, { foreignKey: 'speciesId' })
db.nominations.belongsTo(db.genus, { foreignKey: 'genusId' })
db.nominations.belongsTo(db.counties, { foreignKey: 'countyId' })
db.nominationImages.belongsTo(db.nominations, { foreignKey: 'nominationId' })
db.nominations.belongsTo(db.trees, { foreignKey: 'treeId' })
db.newsImages.belongsTo(db.news, { foreignKey: 'k_news' })
db.sections.belongsTo(db.pages, { foreignKey: 'page_id' })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
