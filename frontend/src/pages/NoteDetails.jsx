import { ArrowLeftIcon, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router'
import api from "../api/axios.js";
import toast from "react-hot-toast";

const NoteDetails = () => {

	const [note, setNote] = useState('');
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(true);

	const { id } = useParams();
	const navigate = useNavigate()

	useEffect(() => {
		const fetchNote = async () => {

			try {
				const res = await api.get(`/notes/${id}`)
				setNote(res.data)
			} catch (error) {
				console.log('Error fetch notes', error)
				toast.error('Failed to fetch note')
			} finally {
				setLoading(false)
			}
		}
		fetchNote()
	}, []);



	const handleDelete = async () => {
		if (!window.confirm('Are you sure you want to delete it?')) return;
		try {
			await api.delete(`/notes/${id}`)
			toast.success('The note was successfully deleted')
			navigate('/')
		} catch (error) {
			console.log('Error handleDelete note', error)
			toast.error('Failed to delete note')
		}
	}

	const handleSave = async (e) => {
		e.preventDefault()

		if (!note.title.trim() || !note.content.trim()) {
			toast.error('Please add a title or content')
			return;
		}
		setSaving(true)
		try {
			await api.put(`/notes/${id}`, note);
			navigate('/')
			toast.success('The note was successfully updated')
		} catch (error) {
			console.log('Error handleSave note', error)
			toast.error('Failed to update note')
		} finally {
			setSaving(false)
		}
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[80vh]">
				<div className="loader"></div>
			</div>
		)
	}

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-15 px-5 md:px-10">
			<div className="max-w-135 m-auto">
				<div className="flex items-center justify-between mb-5">
					<Link to={'/'} className="flex items-center gap-2 btn btn-soft w-max text-black p-2 rounded-full">
						<ArrowLeftIcon />
						Back to notes
					</Link>
					<motion.div whileHover={{ scale: 1.2 }} className="flex items-center gap-2 border border-white/24 p-2 rounded-full cursor-pointer" onClick={handleDelete}>
						<IconlyDelete />
					</motion.div>
				</div>
				<form onSubmit={handleSave} className="w-full h-full border border-white/15 p-7 rounded-4xl">
					<div className="flex flex-col gap-5">
						<p>
							<label htmlFor="title" className="text-xl">Title</label>
							<input
								value={note.title}
								onChange={(e) => setNote({ ...note, title: e.target.value })}
								type="text"
								maxLength={30}
								name="title"
								id="title"
								placeholder="Note Title"
								className="w-full rounded-lg bg-white/5 outline-0 p-2 text-neutral-400 mt-3" />
						</p>
						<p>
							<label htmlFor="content" className="text-xl">Content</label>
							<textarea
								value={note.content}
								onChange={(e) => setNote({ ...note, content: e.target.value })}
								name="content"
								id="content"
								maxLength={500}
								placeholder="Note Content"
								className="w-full rounded-lg h-20 bg-white/5 outline-0 p-2 text-neutral-400 mt-3"></textarea>
						</p>
						<div className="ml-auto">
							<button className="btn btn-soft rounded-full disabled:bg-white/5" disabled={saving}>
								{saving ? "Saving..." : "Save note"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</motion.div>
	);
}

export default NoteDetails;


export const IconlyDelete = ({ size = 24, color = "#ff6467" }) => {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M19.3245 9.4682C19.3245 9.4682 18.7815 16.2032 18.4665 19.0402C18.3165 20.3952 17.4795 21.1892 16.1085 21.2142C14.8215 21.2374 13.7872 21.2499 12.4995 21.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
			<path d="M5.13379 9.4682C5.13379 9.4682 5.67379 16.1852 5.99079 19.0472C6.13779 20.3782 6.96079 21.1822 8.27979 21.2092C8.85294 21.2213 8.42629 21.2306 8.99976 21.2372" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
			<path d="M20.708 6.2397H17.4998M3.75 6.2397H12.229" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
			<path d="M17.4406 6.2397C16.6556 6.2397 15.9796 5.6847 15.8256 4.9157L15.5826 3.6997C15.4326 3.1387 14.9246 2.7507 14.3456 2.7507H10.1126C9.53358 2.7507 9.02558 3.1387 8.87558 3.6997L8.63258 4.9157C8.47858 5.6847 7.80258 6.2397 7.01758 6.2397" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
		</svg>
	)
}
