import { Router } from 'express';
import JournalController from '../controllers/JournalController';

const router = Router()

router.get('/', JournalController.getAllEntries)
router.get('/:id', JournalController.getAnEntry)
router.post('/', JournalController.addEntry)
router.put('/:id', JournalController.updateEntry)
router.delete('/:id', JournalController.deleteEntry)

export default router
