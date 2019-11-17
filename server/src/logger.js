import winston, { format } from 'winston'
import chalk from 'chalk'

const {
  combine,
  timestamp,
  printf,
  simple,
} = format

const colorCoded = printf(({ level, message, timestamp: time }) => {
  let colorCodedLevel
  switch (level) {
    case 'info':
      colorCodedLevel = chalk.cyan(level)
      break

    case 'warn':
      colorCodedLevel = chalk.yellow(level)
      break

    case 'error':
      colorCodedLevel = chalk.red(level)
      break

    default:
      break
  }
  return `${time} ${colorCodedLevel}: ${message}`
})
export default winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log', format: simple() }),
  ],
  format: combine(
    timestamp(),
    colorCoded,
  ),
})
