import database from '../src/models'
import pry from 'pryjs'

class JournalService {

  static async getAllEntries() {
    try {
      return await database.Journal.findAll()
    } catch(e) {
      throw e
    }
  }

  static async getAnEntry(id) {
    try {
      const theEntry = await database.Journal.findOne({
        where: { id: Number(id) },
        attributes: ['id', 'title', 'content', 'date', 'count', 'UserId']
      })
      return theEntry
    } catch(e) {
      throw e
    }
  }

  static async addEntry(newEntry) {
    try {
      return await database.Journal.create(newEntry)
    } catch(e) {
      throw e
    }
  }

  static async updateEntry(id, updateEntry) {
    try {
      const entryToUpdate = database.Journal.findOne({
        where: { id: Number(id) }
      })
      if (entryToUpdate) {
        await database.Journal.update(updateEntry, { where: { id: Number(id) } })
        return updateEntry
      }
      return null
    } catch(e) {
      throw e
    }
  }

  static async deleteEntry(id) {
    try {
      const entryToDelete = await database.Journal.findOne({
        where: { id: Number(id) }
      })
      if (entryToDelete) {
        const deletedEntry = await database.Journal.destroy({
          where: { id: Number(id) }
        })
        return deletedEntry
      }
      return null
    } catch(e) {
      throw e
    }
  }
}

export default JournalService
