import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'

import config from './config'
import logger from './logger'

import {
  classification,
  login,
  logout,
  pages,
  nominations,
  trees,
  news,
} from './routes'

const { port, clientAddresses } = config.default.core
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// CORS
const corsOptions = {
  origin: clientAddresses,
  credentials: true,
}
app.use(cors(corsOptions))
//   res.header('Access-Control-Allow-Origin', clientAddress)
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   res.header('Access-Control-Allow-Methods', GET,HEAD,PUT,PATCH,POST,DELETE
//   next()
// })

app.use('/uploads', express.static(path.join(__dirname, './public/uploads')))
app.use('/treeImages', express.static(path.join(__dirname, './public/treeImages')))
app.use('/newsImages', express.static(path.join(__dirname, './public/newsImages')))
app.use('/pagesUploads', express.static(path.join(__dirname, './public/pagesUploads')))
// Serve react app
// if (process.env.NODE_ENV !== 'dev') {
app.use(express.static(path.join(__dirname, '/public')))
// }

app.use('/classification', classification)
app.use('/pages', pages)
app.use('/trees', trees)
app.use('/pages', pages)
app.use('/nominations', nominations)
app.use('/login', login)
app.use('/logout', logout)
app.use('/news', news)

app.get('/*', (req, res) => {
  if (process.env.NODE_ENV !== 'dev') {
    res.sendFile(path.join(__dirname, './public/index.html'))
  }
})

app.listen(port, () => logger.log({ level: 'info', message: `Example app listening on port ${port}!` }))
