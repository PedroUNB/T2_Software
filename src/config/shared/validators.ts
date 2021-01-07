export const existsOrError = (value: any, msg: string) => {
  if (!value) throw msg
  if (Array.isArray(value) && value.length === 0) throw msg
  if (typeof value === 'string' && !value.trim()) throw msg
}

export const notExistsOrError = (value: any, msg: string) => {
  try {
    if (!value) throw msg
    if (Array.isArray(value) && value.length === 0) throw msg
    if (typeof value === 'string' && !value.trim()) throw msg
  } catch (msg) {
    return
  }
  throw msg
}

export const equalsOrError = (valueA: any, valueB: any, msg: string) => {
  if (valueA !== valueB) throw msg
}

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const validateCPF = (strCPF: string) => {
  let Soma: number
  let Resto: number
  Soma = 0
  if (strCPF === '00000000000') return false

  for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
  Resto = (Soma * 10) % 11

  if ((Resto === 10) || (Resto === 11)) Resto = 0
  if (Resto !== parseInt(strCPF.substring(9, 10))) return false

  Soma = 0
  for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
  Resto = (Soma * 10) % 11

  if ((Resto === 10) || (Resto === 11)) Resto = 0
  if (Resto !== parseInt(strCPF.substring(10, 11))) return false
  return true
}
