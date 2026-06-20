import { ArrowLeftIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api/axios.js";
import {toast} from "react-hot-toast";

const Create = () => {


	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		// if(!title.trim() || !content.trim()) {
		// 	toast.error('All field are required')
		// 	return;
		// }
		setLoading(true)
		try {
			await api.post('/notes', {title, content});
			toast.success('Note created success')
			navigate('/')
		} catch (error) {
			console.log('Error creating note', error)
			if(error.response.status === 429) {
				toast.error("The note creation speed is too fast. Please wait a moment and try again.", {
					duration: 4000,
				})
			} else {
				toast.error('Failed to create note')
			}
		} finally {
			setLoading(false)
		}
	}






	return (
		<motion.div initial={{ opacity: 0}} animate={{ opacity: 1}} className="py-15 px-5 md:px-10">
			<div className="max-w-135 m-auto">
				<div className="mb-5 w-max">
					<Link to={'/'} className="flex items-center gap-2 btn btn-soft w-max text-black p-2 rounded-full">
						<ArrowLeftIcon />
						<h2>Back to notes</h2>
					</Link>
				</div>
				<form onSubmit={handleSubmit} className="w-full h-full border border-white/24 p-7 rounded-4xl">
					<div className="flex flex-col gap-5">
						<h2 className="text-2xl logo">Create New Note</h2>
						<p>
							<label htmlFor="title" className="text-xl">Title</label>
							<input
								onChange={(e) => setTitle(e.target.value)}
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
								onChange={(e) => setContent(e.target.value)}
								name="content"
								id="content"
								maxLength={500}
								placeholder="Note Content"
								className="w-full rounded-lg h-20 bg-white/5 outline-0 p-2 text-neutral-400 mt-3"></textarea>
						</p>
						<div className="ml-auto">
							<button className="btn btn-soft rounded-full disabled:bg-white/5" disabled={loading}>
								{loading ? "Creating..." : "Create note"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</motion.div>
	);
}

export default Create;
