import dotenv from 'dotenv'

dotenv.config()

export const {
  NODE_ENV,
  SERVER_ADDRESS,
  PORT,
  SECRET,
  PROD_DB_USERNAME,
  PROD_DB_NAME,
  PROD_DB_PW,
} = process.env

export const IS_DEV = NODE_ENV === 'dev'
export const IS_PROD = NODE_ENV === 'production'

export default {
  default: {
    // Core related settings
    // Server / Cors / Node Version
    db: {
      username: PROD_DB_USERNAME,
      name: PROD_DB_NAME,
      password: PROD_DB_PW,
    },

    core: {
      address: SERVER_ADDRESS || '0.0.0.0',
      port: PORT || '4000',
      engine: 10.16,
      env: NODE_ENV,
      clientAddresses: IS_DEV ? ['http://localhost:3000'] : ['https://pabigtrees.com', 'https://www.pabigtrees.com'],
      serverAddress: IS_DEV ? 'http://localhost:4000' : 'http://pagbigtrees.com',
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
