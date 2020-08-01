import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'

import config from './config'
import logger from './logger'

import {
  login,
  pages,
  nominations,
  trees,
  news,
} from './routes'

const { port } = config.default.core
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}
app.use(cors(corsOptions))
//   console.log({ clientAddress })
//   res.header('Access-Control-Allow-Origin', clientAddress)
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   res.header('Access-Control-Allow-Methods', GET,HEAD,PUT,PATCH,POST,DELETE
//   next()
// })

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.use('/treeImages', express.static(path.join(__dirname, '../treeImages')))
app.use('/newsImages', express.static(path.join(__dirname, '../newsImages')))

// Serve react app
app.use(express.static(path.join(__dirname, '../lib/public')))

app.use('/pages', pages)
app.use('/trees', trees)
app.use('/pages', pages)
app.use('/nominations', nominations)
app.use('/login', login)
app.use('/news', news)

app.get('/*', (req, res) => {
  if (process.env.NODE_ENV !== 'dev') {
    res.sendFile(path.join(__dirname, '../lib/public/index.html'))
  }
})

app.listen(port, () => logger.log({ level: 'info', message: `Example app listening on port ${port}!` }))
