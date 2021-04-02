import JournalService from '../services/JournalService.js'
import Util from '../utils/Utils.js'
import pry from 'pryjs'


const util = new Util();

class JournalController {

  static async getAllEntries(req, res) {
    try {
      const allEntries = await JournalService.getAllEntries()
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
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const theEntry = await JournalService.getAnEntry(id)
      if (!theEntry) {
        util.setError(404, `Cannot find the entry with the id ${id}`)
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
    if (!req.body.title || !req.body.content) {
      util.setError(400, 'Please provide complete parameters')
      return util.send(res)
    }
    try {
      const date = new Date()
      const dateOnly = date.toISOString().split('T')[0]
      const count = req.body.content.split('').length
      const newEntry = {...req.body, count, date: dateOnly}
      const createdEntry = await JournalService.addEntry(newEntry)
      util.setSuccess(201, 'Entry added', createdEntry)
      return util.send(res)
    } catch (e) {
      util.setError(400, e.message)
      return util.send(res)
    }
  }

  static async updateEntry(req, res) {
    const { id } = req.params
    const alteredEntry  = req.body
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
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

}

export default JournalController
