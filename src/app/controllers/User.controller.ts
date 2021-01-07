import * as express from 'express'
import * as bcrypt from 'bcrypt-nodejs'
import { Request, Response } from 'express'
import IControllerBase from '@interfaces/IControllerBase.interface'
import { User } from '@models/User.model'

import { equalsOrError, existsOrError, notExistsOrError, validateCPF, validateEmail } from '@config/shared/validators'

const encryptPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

class UserController implements IControllerBase {
  public path = '/user'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get(this.path, this.index)
    this.router.post(this.path, this.save)

    this.router.get(this.path + '/:id', this.getById)
    this.router.put(this.path + '/:id', this.save)
    this.router.delete(this.path + '/:id', this.delete)
  }

  index = async (req: Request, res: Response) => {
    try {
      const users = await User.find({}).select('name email phone cpf')

      return res.status(200).json(users)
    } catch (error) {
      return res.status(400).json({ error: 'Error finding Users' })
    }
  }

  save = async (req: Request, res: Response) => {
    const { name, email, password, confirmPassword, phone } = req.body
    let cpf = req.body.cpf

    try {
      existsOrError(name, 'Name was not provided!')
      existsOrError(email, 'E-mail was not provided!')
      existsOrError(cpf, 'CPF was not provided!')
      existsOrError(password, 'Password was not provided!')
      existsOrError(confirmPassword, 'Password confirmation was not provided!')
      equalsOrError(password, confirmPassword, 'Password do not match!')
      equalsOrError(validateEmail(email), true, 'Please enter a valid email address!')

      cpf = req.body.cpf.replace(/\.|-/g, '')

      equalsOrError(validateCPF(cpf), true, 'Please enter a valid cpf!')

      const userFromDB = await User.findOne({
        $or: [{ email: email }, { cpf: cpf }]
      })

      if (userFromDB && !req.params.id) {
        if (userFromDB.email === email.toLowerCase()) {
          notExistsOrError(userFromDB, 'A user with this email already exists!')
        }
        if (userFromDB.cpf && userFromDB.cpf === cpf) {
          notExistsOrError(userFromDB, 'A user with this cpf already exists!')
        }
      }
    } catch (error) {
      return res.status(400).json({ error })
    }

    const password_hash = encryptPassword(password)

    if (req.params.id) {
      User.findByIdAndUpdate({ _id: req.params.id }, {
        name,
        email,
        password: password_hash,
        phone,
        cpf
      }).then(() => {
        res.status(201).json({ message: `User: ${name} update successfully` })
      }).catch(err => res.status(500).send(err))
    } else {
      User.create({
        name,
        email,
        password: password_hash,
        confirmPassword,
        phone,
        cpf
      }).then(() => {
        res.status(201).json({ message: `User: ${name} created successfully` })
      }).catch(err => res.status(500).send(err))
    }
  }

  getById = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id).select('name email cpf phone')

      if (user) return res.status(200).json(user)
      else return res.status(404).send({ error: 'User not found' })
    } catch (error) {
      return res.status(400).json({ error: 'Error finding user' })
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      User.findByIdAndRemove(req.params.id)
        .then(() => res.status(200).send({ message: 'Successfully deleted' }))
        .catch(() => res.status(404).send({ message: 'User not found' }))

      return
    } catch (error) {
      return res.status(400).send({ error: 'Error deleting user!' })
    }
  }
}

export default UserController
