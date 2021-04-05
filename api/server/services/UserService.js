import database from '../src/models'
import bcrypt from 'bcryptjs'
import pry from 'pryjs'

class UserService {

  static async getAllUsers() {
    try {
      return await database.User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        include: {
          model: database.Journal,
          attributes: ['id', 'title', 'content', 'date', 'count', 'UserId']
        }
      })
    } catch(e) {
      throw e
    }
  }

  static async getAUser(id) {
    try {
      const theUser = await database.User.findOne({
        where: { id: Number(id) },
        attributes: ['id', 'firstName', 'lastName', 'email'],
        include: {
          model: database.Journal,
          attributes: ['id', 'title', 'content', 'date', 'count', 'UserId']
        }
      })
      return theUser
    } catch(e) {
      throw e
    }
  }

  // create user
  static async addUser(newUser) {
    try {
      const { email } = newUser
      const oldUser = await database.User.findOne({
        where: { email: email }
      })
      if (oldUser) {
        return null
      } else {
        return await database.User.create(newUser)
      }
    } catch(e) {
      throw e
    }
  }

  // delete user
  static async  deleteUser(id) {
    try {
      const userToDelete = await database.User.findOne({
        where: { id: Number(id) }
      })
      if (userToDelete) {
        const deletedUser = await database.User.destroy({
          where: { id: Number(id) }
        })
        return deletedUser
      }
      return null
    } catch(e) {
      throw e
    }

  }

  // register user
  // TODO: Check for duplicate emails
  static async registerUser(newUser) {
    const { email } = newUser
    const oldUser = await database.User.findOne({
      where: { email: email }
    })
    if (oldUser) {
      return null
    }
    try {
      var salt = bcrypt.genSaltSync(10);
      var hashedPassword = bcrypt.hashSync(newUser.password, salt)
      const userWithHashedPassword = {
        ...newUser,
        password: hashedPassword
      }
      return await database.User.create(userWithHashedPassword)
    } catch(e) {
      throw e
    }
  }

  // login user
  static async login(email, password) {
    try {
      const userToLogin = await database.User.findOne({
        where: { email: email },
        attributes: ['id', 'firstName', 'lastName', 'email', 'password']
      })
      if (!userToLogin) {
        return null
      } else {
        const isSame = bcrypt.compareSync(password, userToLogin.password)
        if (isSame) {
          return userToLogin
        } else {
          return null
        }
      }
    } catch(e) {
      throw e
    }

  }

  // logout
  static async logout() {

  }

}

export default UserService
