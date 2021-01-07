import cors from 'cors'
import express, { Application } from 'express'
import morgan from 'morgan'

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
  }

  private routes() {

  }
}

export default new App().express
