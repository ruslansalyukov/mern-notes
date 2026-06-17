import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import api from "../api/axios.js";
import RateLimited from "../components/RateLimited";
import toast from "react-hot-toast";
import NotesNotFound from "../components/NotesNotFound";

const Home = () => {

	const [notes, setNotes] = useState([]);
	const [isRateLimited, setIsRateLimited] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {

		const fetchNotes = async () => {
			try {
				const res = await api.get('/notes')
				setNotes(res.data)
				console.log(res.data)
			} catch (error) {
				console.log('Error fetch notes', error)
				if (error.response?.status === 429) {
					setIsRateLimited(true);
				} else if (error.response?.status === 401) {
					return;
				} else {
					toast.error('Failed to load notes')
				}
			} finally {
				setLoading(false)
			}
		}
		fetchNotes()
	}, [])




	return (
		<div>
			{isRateLimited && <RateLimited />}

			{loading && <div className="m-2">Loading...</div>}


			<div className="py-15 px-5 md:px-10">

				{notes.length === 0 && !isRateLimited && <NotesNotFound />}

				{notes.length > 0 && !isRateLimited && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
						{notes.map((note) => {
							return <NoteCard key={note._id} note={note} setNotes={setNotes} />
						})}
					</div>
				)}

			</div>
		</div>
	);
}

export default Home;
