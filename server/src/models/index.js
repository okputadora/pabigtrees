
import Sequelize from 'sequelize'
import trees from './trees'
import species from './species'
import counties from './counties'
import genus from './genus'
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


// fs
//   .readdirSync(__dirname)
//   .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//   .forEach(file => {
//     const model = sequelize.import(path.join(__dirname, file))
//     db[model.name] = model
//   })

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db)
//   }
// })
db.Sequelize = Sequelize
db.sequelize = sequelize

db.species = species(sequelize, Sequelize)
db.trees = trees(sequelize, Sequelize)
db.counties = counties(sequelize, Sequelize)
db.genus = genus(sequelize, Sequelize)

// Relations
db.trees.belongsTo(db.species, { foreignKey: 'species' })
db.trees.belongsTo(db.counties, { foreignKey: 'k_county' })
db.species.belongsTo(db.genus, { foreignKey: 'k_genus' })

module.exports = db

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
