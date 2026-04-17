import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import axiosInstance from '../api/axiosInstance'
import NoteFormModal from '../components/NoteFormModal'
import { useAuth } from '../hooks/useAuth'

function DashboardPage() {
  const { user, logout } = useAuth()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const [modalKey, setModalKey] = useState(0)

  const fetchNotes = async () => {
    try {
      const { data } = await axiosInstance.get('/notes')
      setNotes(data.notes)
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'Failed to fetch notes'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadNotes = async () => {
      await fetchNotes()
    }
    loadNotes()
  }, [])

  const openCreateModal = () => {
    setSelectedNote(null)
    setModalKey((prev) => prev + 1)
    setIsModalOpen(true)
  }

  const openEditModal = (note) => {
    setSelectedNote(note)
    setModalKey((prev) => prev + 1)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedNote(null)
  }

  const handleSubmit = async (payload) => {
    setSubmitting(true)
    try {
      if (selectedNote) {
        const { data } = await axiosInstance.put(`/notes/${selectedNote._id}`, payload)
        setNotes((prev) =>
          prev.map((note) => (note._id === selectedNote._id ? data.note : note)),
        )
        toast.success('Note updated')
      } else {
        const { data } = await axiosInstance.post('/notes', payload)
        setNotes((prev) => [data.note, ...prev])
        toast.success('Note created')
      }
      closeModal()
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'Action failed'
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (noteId) => {
    setSubmitting(true)
    try {
      await axiosInstance.delete(`/notes/${noteId}`)
      setNotes((prev) => prev.filter((note) => note._id !== noteId))
      toast.success('Note deleted')
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'Delete failed'
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-slate-900">My Notes</h1>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-600 sm:inline">
              Hi, {user?.name || 'User'}
            </span>
            <button
              onClick={logout}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Your Notes</h2>
          <button
            onClick={openCreateModal}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            + New Note
          </button>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-soft">
            Loading notes...
          </div>
        ) : notes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-soft">
            <h3 className="text-lg font-semibold text-slate-900">No notes yet</h3>
            <p className="mt-2 text-slate-500">Create your first note to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <article
                key={note._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-indigo-300"
              >
                <h3 className="text-lg font-semibold text-slate-900">{note.title}</h3>
                <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-600">
                  {note.content}
                </p>
                <p className="mt-4 text-xs text-slate-400">
                  Updated {new Date(note.updatedAt).toLocaleString()}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => openEditModal(note)}
                    className="rounded-md bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-700 transition hover:bg-amber-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    disabled={submitting}
                    className="rounded-md bg-rose-100 px-3 py-1.5 text-sm font-medium text-rose-700 transition hover:bg-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <NoteFormModal
        key={modalKey}
        isOpen={isModalOpen}
        note={selectedNote}
        onClose={closeModal}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  )
}

export default DashboardPage
