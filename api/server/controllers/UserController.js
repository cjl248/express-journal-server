import UserService from '../services/UserService.js'
import Util from '../utils/Utils.js'
import pry from 'pryjs'

const util = new Util()

class UserController {

  static async getAllUsers(req, res) {
    try {
      const allUsers = await UserService.getAllUsers()
      if (allUsers.length > 0) {
        util.setSuccess(200, 'Users retrieved', allUsers)
      } else {
        util.setSuccess(200, 'No users found')
      }
      return util.send(res)
    } catch(e) {
      util.setError(400, e.message)
      return util.send(res)
    }
  }

  static async getAUser(req, res) {
    const { id } = req.parms
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const theUser = await UserService.getAnEntry(id)
      if (!theUser) {
        util.setError(404, `Cannot find the user with the id ${id}`)
      } else {
        util.setSuccess(200, 'Found user', theUser)
      }
      return util.send(res)
    } catch(e) {
      util.setError(400, e.message)
      return util.send(res)
    }
  }

  static async addUser(req, res) {
    if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
      util.setError(400, 'Please provide complete user information')
      return util.send(res)
    }
    try {
      const createdUser = await UserService.addUser(req.body)
      util.setSuccess(201, 'User added', createdUser)
      return util.send(res)
    } catch(e) {
      util.setError(400, e.message)
      return util.send(res)
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      util.send(res)
    }
    try {
      const userToDelete = await UserService.deleteUser(id)
      if (userToDelete) {
        util.setSuccess(200, 'User deleted')
      } else {
        util.setError(404, `User with the id ${id} cannot be found`)
      }
      return util.send(res)
    } catch(e) {
      util.setError(400, e.message)
      return util.send(res)
    }
  }

  static async login(req, res) {

  }

  static async logout(req, res) {

  }

}

export default UserController
