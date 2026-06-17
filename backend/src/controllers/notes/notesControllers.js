import mongoose from 'mongoose';
import Note from '../../models/Note.js'
import { Types } from 'mongoose';

const isValidId = (id) => Types.ObjectId.isValid(id);

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({
            userId: req.userId,
        }).sort({ createdAt: -1 });
        res.status(200).json(notes)
    } catch (error) {
        console.log('Error in getAllNotes controllers', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({ message: 'Invalid note id' })
        }
        const note = await Note.findOne({
            _id: id,
            userId: req.userId,
        })
        if (!note) {
            return res.status(404).json({ message: 'Note not found' })
        }
        res.status(200).json(note)
    } catch (error) {
        console.log('Error in getNoteById controllers', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
export const createNote = async (req, res) => {
    try {
        const note = await Note.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.userId,
        })
        res.status(201).json(note)
    } catch (error) {
        console.log('Error in createNote controllers', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
export const updatedNote = async (req, res) => {

    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!isValidId(id)) {
            return res.status(400).json({ message: 'Invalid note id' })
        }
        const updatedNote = await Note.findOneAndUpdate(
            {
                _id: id,
                userId: req.userId,
            },
            {
                title,
                content,
            },
            {
                returnDocument: true,
            }
        )
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(updatedNote)
    } catch (error) {
        console.log('Error in updatedNote controllers', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
export const deletedNote = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({ message: 'Invalid note id' })
        }
        const deletedNote = await Note.findOneAndDelete({
            _id: id,
            userId: req.userId,
        })
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' })
        }
        res.status(200).json({ message: 'Note deleted success' })
    } catch (error) {
        console.log('Error in deletedNote controllers', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}