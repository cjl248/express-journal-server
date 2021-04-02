import database from '../src/models'

class UserService {

  static async getAllUsers() {
    try {
      return await database.User.findAll()
    } catch(e) {
      throw e
    }
  }

  static async getAUser(id) {
    try {
      const theUser = await database.User.findOne({
        where: { id: Number(id) }
      })
      return theUser
    } catch(e) {
      throw e
    }
  }

  // create (register) user
  static async addUser(newUser) {
    try {
      return await database.User.create(newUser)
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

  // get (login) user
  static async login(email, password) {
    
  }

  // logout
  static async logout() {

  }

}

export default UserService
