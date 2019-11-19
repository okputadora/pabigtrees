import express from 'express'
// import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

import config from './config'
import logger from './logger'

import {
  // login,
  // logout,
  trees,
} from './routes'

const { port } = config.default.core
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// CORS
const corsOptions = {
  origin: '*',
}
app.use(cors(corsOptions))
//   console.log({ clientAddress })
//   res.header('Access-Control-Allow-Origin', clientAddress)
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   res.header('Access-Control-Allow-Methods', GET,HEAD,PUT,PATCH,POST,DELETE
//   next()
// })

app.use((req, res, next) => { console.log('is the request making it here?'); next() })
// app.use('/login', login)
// app.use('/logout', logout)
app.use('/trees', trees)

const server = app.listen(port, () => logger.log({ level: 'info', message: `Example app listening on port ${port}!` }))

// For Development Only @TODO this is not working right now
process.once('SIGUSR2', () => {
  // gracefulShutdown(function () {
  console.log('killing proces@!!')
  process.kill(process.pid, 'SIGUSR2')
  // });
})
process.on('SIGINT', () => {
  console.log(process.pid); server.close(() => {
    console.log('server closed!')
    process.exit()
  })
})
