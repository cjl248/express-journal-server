import { Router } from 'express';
import JournalController from '../controllers/JournalController';

const journalRouter = Router({ mergeParams: true} )

journalRouter.get('/', JournalController.getAllEntries)
journalRouter.get('/:id', JournalController.getAnEntry)
journalRouter.post('/', JournalController.addEntry)
journalRouter.put('/:id', JournalController.updateEntry)
journalRouter.delete('/:id', JournalController.deleteEntry)

export default journalRouter
