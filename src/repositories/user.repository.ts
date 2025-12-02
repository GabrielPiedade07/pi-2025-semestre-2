import User from '../entities/user.entity' 
export const createUser = async (data: { name: string, email: string, password: string }) => {
  return User.create({ data }) 
}
export const findAllUsers = async () => {
  return User.findMany() 
}
export const findUserByEmail = async (email: string) => {
  return User.findFirst({ where: { email } }) 
}