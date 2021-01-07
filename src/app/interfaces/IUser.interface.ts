interface IUser {
  readonly id: string
  name: string
  email: string
  password: string
  cpf: string
  phone: string
  created_at: Date
}

export default IUser
