import cors from 'cors'
import express, { Application } from 'express'
import morgan from 'morgan'

import mongoose from '@config/mongodb'
import UserController from '@controllers/User.controller'
class App {
  express: Application

  constructor() {
    this.express = express()

    this.middlewares()
    this.routes()
    this.mongo()
  }

  private middlewares() {
    this.express.use(express.json())
    this.express.use(cors({ origin: '*' }))
    this.express.use(morgan('tiny'))
  }

  private mongo() {
    return mongoose
  }

  private routes() {
    this.express.use('/', new UserController().router)
  }
}

export default new App().express
