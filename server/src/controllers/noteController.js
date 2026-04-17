const Note = require('../models/Note')

const getNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.user.userId }).sort({ updatedAt: -1 })
  return res.status(200).json({ notes })
}

const createNote = async (req, res) => {
  const { title, content } = req.body

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' })
  }

  const note = await Note.create({
    userId: req.user.userId,
    title: title.trim(),
    content: content.trim(),
  })

  return res.status(201).json({ message: 'Note created', note })
}

const updateNote = async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' })
  }

  const note = await Note.findOneAndUpdate(
    { _id: id, userId: req.user.userId },
    { title: title.trim(), content: content.trim() },
    { new: true },
  )

  if (!note) {
    return res.status(404).json({ message: 'Note not found' })
  }

  return res.status(200).json({ message: 'Note updated', note })
}

const deleteNote = async (req, res) => {
  const { id } = req.params
  const note = await Note.findOneAndDelete({ _id: id, userId: req.user.userId })

  if (!note) {
    return res.status(404).json({ message: 'Note not found' })
  }

  return res.status(200).json({ message: 'Note deleted' })
}

module.exports = { getNotes, createNote, updateNote, deleteNote }
