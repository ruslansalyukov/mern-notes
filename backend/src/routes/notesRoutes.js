import express from 'express';
import { createNote, deletedNote, getAllNotes, getNoteById, updatedNote } from '../controllers/notes/notesControllers.js';
import { auth } from '../middleware/auth.js';

const router = express.Router()


router.get('/', auth, getAllNotes,)
router.get('/:id', auth, getNoteById)
router.post('/', auth, createNote)
router.put('/:id', auth, updatedNote)
router.delete('/:id', auth, deletedNote)

export default router