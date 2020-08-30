import dotenv from 'dotenv'

dotenv.config()

export const {
  NODE_ENV,
  SERVER_ADDRESS,
  PORT,
  SECRET,
} = process.env

export const IS_DEV = NODE_ENV === 'dev'
export const IS_PROD = NODE_ENV === 'production'

export default {
  default: {
    // Core related settings
    // Server / Cors / Node Version
    core: {
      address: SERVER_ADDRESS || '0.0.0.0',
      port: PORT || '4000',
      engine: 10.16,
      env: NODE_ENV,
      clientAddress: IS_DEV ? 'http://localhost:3000' : '', // @TODO prod url
      serverAddress: IS_DEV ? 'http://localhost:4000' : '',

      // CORS
      cors: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
      },

      // Logger
      logger: {
        level: 'info',
        silent: false,
        prettify: true,
        transports: {
          console: true,
          file: true,
        },
      },
    },
  },

  // Test environment
  test: {
    core: {
      port: null, // Enable autobind ports to avoid colisions
      logger: {
        level: 'error',
      },
    },
  },

  // Production environment
  production: {
    core: {
      logger: {
        prettify: false,
      },
    },
  },
}
