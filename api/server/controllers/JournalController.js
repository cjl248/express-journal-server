import JournalService from '../services/JournalService.js'
import UserService from '../services/UserService.js'
import Util from '../utils/Utils.js'
import config from 'dotenv'
import jwt from 'jsonwebtoken'
import pry from 'pryjs'

config.config()
const util = new Util();

class JournalController {

  static async getAllEntries(req, res) {
    let token = ''
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1]
    }
    const loggedIn = await JournalController.isLoggedIn(req.params.UserId, token)
    if (!loggedIn) {
      util.setError(401, 'Please login -- unauthorized')
      return util.send(res)
    }
    try {
      const theUser = await UserService.getAUser(req.params.UserId)
      const allEntries = await theUser.getJournals({
        attributes: ['id', 'title', 'content', 'date', 'count']
      })
      if (allEntries.length > 0) {
        util.setSuccess(200, 'Entries retrieved', allEntries)
      } else {
        util.setSuccess(200, 'No entries found')
      }
      return util.send(res)
    } catch(e) {
      util.setError(400, e.message)
      return util.send(res)
    }
  }

  static async getAnEntry(req, res) {
    let token = ''
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1]
    }
    const loggedIn = await JournalController.isLoggedIn(req.params.UserId, token)
    if (!loggedIn) {
      util.setError(401, 'Please login -- unauthorized')
      return util.send(res)
    }
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please include a valid numeric user id')
      return util.send(res)
    }
    try {
      const theUser = await UserService.getAUser(req.params.UserId)
      const theEntry = await theUser.getJournals({
        where: { id: id }
      })
      // const theEntry = await JournalService.getAnEntry(id)
      if (!theEntry || theEntry.length === 0) {
        util.setError(404, `Cannot find the entry with the id ${id} for user ${req.params.UserId}`)
      } else {
        util.setSuccess(200, 'Found entry', theEntry)
      }
      return util.send(res)
    } catch(e) {
      util.setError(400, e.message)
      return util.send(res)
    }
  }

  static async addEntry(req, res) {
    let token = ''
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1]
    }
    const loggedIn = await JournalController.isLoggedIn(req.params.UserId, token)
    if (!loggedIn) {
      util.setError(401, 'Please login -- unauthenticated')
      return util.send(res)
    }
    if (!req.body.title || !req.body.content) {
      util.setError(400, 'Please provide complete parameters')
      return util.send(res)
    }
    try {
      const date = new Date()
      const dateOnly = date.toISOString().split('T')[0]
      const count = req.body.content.split('').length
      const newEntry = {
        ...req.body,
        count, date:
        dateOnly,
        UserId: req.params.UserId
      }
      const createdEntry = await JournalService.addEntry(newEntry)
      util.setSuccess(201, 'Entry added', createdEntry)
      return util.send(res)
    } catch (e) {
      util.setError(400, e.message)
      return util.send(res)
    }
  }

  static async updateEntry(req, res) {
    let token = ''
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1]
    }
    const loggedIn = await JournalController.isLoggedIn(req.params.UserId, token)
    if (!loggedIn) {
      util.setError(401, 'Please login -- unauthenticated')
      return util.send(res)
    }
    const { id } = req.params
    const alteredEntry  = req.body
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res);
    }
    if (!req.body.title || !req.body.content) {
      util.setError(400, 'Please include information to update')
      return util.send(res)
    }
    try {
      const count = req.body.content.split('').length
      alteredEntry['count'] = count
      const updatedEntry = await JournalService.updateEntry(id, alteredEntry)
      if (!updatedEntry) {
        util.setError(404, `Cannot find Entry with id ${id}`)
      } else {
        util.setSuccess(200, 'Entry updated', updatedEntry)
      }
      util.send(res)
    } catch(e) {
      util.setError(400, e.message)
      util.send(res)
    }

  }

  static async deleteEntry(req, res){
    let token = ''
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1]
    }
    const loggedIn = await JournalController.isLoggedIn(req.params.UserId, token)
    if (!loggedIn) {
      util.setError(401, 'Please login -- unauthenticated')
      return util.send(res)
    }
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      util.send(res)
    }
    try {
      const entryToDelete = await JournalService.deleteEntry(id)
      if (entryToDelete) {
        util.setSuccess(200, 'Entry deleted')
      } else {
        util.setError(404, `Entry with the id ${id} cannot be found`)
      }
      return util.send(res)
    } catch(e) {
      util.setError(400, e.message)
      return util.send(res)
    }
  }

  static async isLoggedIn(id, receivedToken) {
    const theUser = await UserService.getAUser(id)
    const JWT_KEY = process.env.JWT_KEY
    const token = jwt.sign(theUser.dataValues.id, JWT_KEY)
    return token === receivedToken
  }

}

export default JournalController
