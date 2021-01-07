import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '@interfaces/IControllerBase.interface'
import { User } from '@models/User.model'

import { equalsOrError, existsOrError, notExistsOrError } from '@config/shared/validators'

class DebitController implements IControllerBase {
  public path = '/user'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get(this.path, this.index)
    this.router.post(this.path, this.create)

    this.router.get(this.path + '/:id', this.getById)
    this.router.put(this.path + '/:id', this.update)
    this.router.delete(this.path + '/:id', this.delete)
  }

  index = async (req: Request, res: Response) => {

  }

  create = async (req: Request, res: Response) => {
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      cpf
    } = req.body

    try {
      existsOrError(name, 'Name was not provided!')
      existsOrError(email, 'E-mail was not provided!')
      existsOrError(password, 'Password was not provided!')
      existsOrError(confirmPassword, 'Password confirmation was not provided!')
      equalsOrError(password, confirmPassword, 'Password do not match!')

      const userFromDB = await User.findOne({
        email
      })

      if (userFromDB) notExistsOrError(userFromDB, 'A user with this email already exists!')

      const user = await User.create({
        name,
        email,
        password,
        confirmPassword,
        phone,
        cpf
      })

      return res.status(201).json({ user })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  getById = async (req: Request, res: Response) => {

  }

  update = async (req: Request, res: Response) => {

  }

  delete = async (req: Request, res: Response) => {

  }
}

export default DebitController
