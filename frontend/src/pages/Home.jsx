import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import api from "../api/axios.js";
import RateLimited from "../components/RateLimited";
import toast from "react-hot-toast";
import NotesNotFound from "../components/NotesNotFound";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

const Home = () => {
	const [notes, setNotes] = useState([]);
	const [isRateLimited, setIsRateLimited] = useState(false);
	const [loading, setLoading] = useState(true);

	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				setLoading(true);
				const res = await api.get("/notes");
				setNotes(res.data)
			} catch (error) {
				if (error.response?.status === 401) {
					setNotes([]);
					return;
				}
				if (error.response?.status === 429) {
					setIsRateLimited(true);
				} else {
					toast.error("Failed to load notes");
				}
			} finally {
				setLoading(false);
			}
		};
		if (token) {
			fetchNotes();
		} else {
			setNotes([]);
			setLoading(false);
		}
	}, [token])

	return (
		<>
			<div className="">
				{isRateLimited && <RateLimited />}

				{loading && <div className="loader-wrapper"><div className="loader"></div></div>}

				<div className="py-5 px-5 md:px-10">
					{notes.length === 0 && !isRateLimited && !loading && (
						<NotesNotFound />
					)}


					{notes.length > 0 && !isRateLimited && (
						<>
							<div className="sticky top-35 z-10 flex items-center justify-between">
								<div className=""></div>
								<Link to={'/create'}><div className="bg-white backdrop-blur-sm text-black p-3 cursor-pointer rounded-full flex items-center justify-center"><PlusIcon/></div></Link>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative ">
								{notes.map((note) => (
									<NoteCard
										key={note._id}
										note={note}
										setNotes={setNotes}
									/>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Home;
