
import Sequelize from 'sequelize'
import trees from './trees'
import species from './species'
import counties from './counties'
import genus from './genus'
import treeImages from './treeImages'
import nominations from './nominations'
// const env = process.env.NODE_ENV || 'development'
// const config = require(`${__dirname}/../config/config.js`)[env]
const db = {}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PW,
  {
    host: 'localhost',
    dialect: 'mysql',
  },
)

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
// Relations
db.trees.belongsTo(db.species, { foreignKey: 'species' })
db.trees.belongsTo(db.counties, { foreignKey: 'k_county' })
db.species.belongsTo(db.genus, { foreignKey: 'k_genus' })
db.treeImages.belongsTo(db.trees, { foreignKey: 'k_tree' })
db.nominations.belongsTo(db.species, { foreignKey: 'speciesId' })
db.nominations.belongsTo(db.genus, { foreignKey: 'genusId' })
db.nominations.belongsTo(db.counties, { foreignKey: 'county' })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
