import { Link } from 'react-router'
import { formatDate } from '../lib/utils.js';
import { SquarePen, Trash2 } from 'lucide-react'

import { AnimatePresence, motion } from "motion/react"
import api from '../api/axios.js';
import toast from 'react-hot-toast';

const NoteCard = ({ note, setNotes }) => {

	const handleDelete = async (e, id) => {
		e.preventDefault()

		if (!window.confirm('Are you sure you want to delete it?')) return;

		try {
			await api.delete(`/notes/${id}`)
			setNotes((prev) => prev.filter((note) => note._id !== id))
			toast.success('The note was successfully deleted')
		} catch (error) {
			console.log('Error handleDelete note', error)
		}
	}


	return (
		<Link to={`/note/${note._id}`}>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col border border-white/24 w-full h-full p-5 rounded-3xl">
				<h2 className='text-2xl mb-4'>{note.title}</h2>
				<div className="bg-linear-to-r from-transparent via-neutral-700 mb-4 to-transparent h-px w-full"></div>
				<p className='text-[18px] text-neutral-400 mb-10'>{note.content}</p>
				<div className="mt-auto flex items-center justify-between">
					<p className='font-medium text-sm bg-white text-black w-max p-2 py-1 rounded-full'>{formatDate(new Date(note.createdAt))}</p>
					<div className="flex items-center gap-3">
						<motion.div whileHover={{ scale: 1.2 }} className="">
							<IconlyEditSquare/>
						</motion.div>
						<motion.div whileHover={{ scale: 1.2 }} className="" onClick={(e) => handleDelete(e, note._id)}>
							<IconlyDelete />
						</motion.div>
					</div>
				</div>
			</motion.div>
		</Link>
	);
}

export default NoteCard;
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

export const IconlyEditSquare = ({ size = 24, color = "#fff"}) => {
    return (
		<svg width={size} height={size} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
		    <g id="Iconly/Light-Outline/Edit-Square" stroke="none" strokeWidth="1.5" fill="none" fillRule="evenodd">
		        <g id="Edit-Square" transform="translate(2.000000, 2.000000)" fill={color}>
		            <path d="M9.4921,0.0367 C9.9061,0.0367 10.2421,0.3727 10.2421,0.7867 C10.2421,1.2007 9.9061,1.5367 9.4921,1.5367 L5.7531,1.5367 C3.1691,1.5367 1.5001,3.3067 1.5001,6.0457 L1.5001,14.3597 C1.5001,17.0987 3.1691,18.8687 5.7531,18.8687 L14.5771,18.8687 C17.1611,18.8687 18.8311,17.0987 18.8311,14.3597 L18.8311,10.3317 C18.8311,9.9177 19.1671,9.5817 19.5811,9.5817 C19.9951,9.5817 20.3311,9.9177 20.3311,10.3317 L20.3311,14.3597 C20.3311,17.9537 18.0181,20.3687 14.5771,20.3687 L5.7531,20.3687 C2.3121,20.3687 0.0001,17.9537 0.0001,14.3597 L0.0001,6.0457 C0.0001,2.4517 2.3121,0.0367 5.7531,0.0367 L9.4921,0.0367 Z M18.2017,0.9153 L19.4187,2.1323 C20.0117,2.7243 20.3377,3.5113 20.3367023,4.3493 C20.3367023,5.1873 20.0107,5.9733 19.4187,6.5643 L11.9097,14.0733 C11.3587,14.6243 10.6247,14.9283 9.8447,14.9283 L6.0987,14.9283 C5.8967,14.9283 5.7027,14.8463 5.5617,14.7013 C5.4207,14.5573 5.3437,14.3623 5.3487,14.1593 L5.4427,10.3803 C5.4617,9.6283 5.7647,8.9213 6.2967,8.3883 L6.2977,8.3883 L13.7707,0.9153 C14.9927,-0.3047 16.9797,-0.3047 18.2017,0.9153 Z M13.1551,3.6513 L7.3577,9.4493 C7.0987,9.7083 6.9517,10.0523 6.9427,10.4173 L6.8677,13.4283 L9.8447,13.4283 C10.2247,13.4283 10.5807,13.2813 10.8497,13.0123 L16.6821,7.1783 L13.1551,3.6513 Z M14.8307,1.9763 L14.2151,2.5903 L17.7421,6.1183 L18.3587,5.5033 C18.6667,5.1953 18.8367,4.7853 18.8367,4.3493 C18.8367,3.9123 18.6667,3.5013 18.3587,3.1933 L17.1417,1.9763 C16.5047,1.3413 15.4687,1.3413 14.8307,1.9763 Z" id="Combined-Shape"></path>
		        </g>
		    </g>
		</svg>
		)
}
