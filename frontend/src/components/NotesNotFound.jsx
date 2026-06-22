import { Link } from "react-router";

import { motion } from "motion/react";

const NotesNotFound = () => {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-20 rounded-3xl text-center max-w-150 m-auto">
			<div className="flex flex-col items-center gap-10">
				<div className="bg-[#222]/24 p-5 rounded-full">
					<IconlyEditSquare />
				</div>
				<div className="text-2xl">
					The note list is empty. Create your first note now.
				</div>
				<Link to={'/create'}><button type="button" className="btn btn-soft rounded-full">Create Note</button></Link>
			</div>
		</motion.div>
	);
}

export default NotesNotFound;


export const IconlyEditSquare = ({ size = 70, color = "#00c950" }) => {

	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2.75049 16.362C2.75049 19.444 4.66949 21.621 7.75349 21.621H16.5775C19.6625 21.621 21.5815 19.444 21.5815 16.362V12.334" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
			<path d="M11.4925 2.789H7.75349C4.67849 2.789 2.75049 4.966 2.75049 8.048V12.205" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
			<path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.9209L16.3011 3.4479C17.2321 2.5179 18.7411 2.5179 19.6721 3.4479L20.8891 4.6649C21.8201 5.5959 21.8201 7.1059 20.8891 8.0359L13.3801 15.5449C12.9731 15.9519 12.4211 16.1809 11.8451 16.1809H8.09912L8.19312 12.4009C8.20712 11.8449 8.43412 11.3149 8.82812 10.9209Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
			<path d="M15.1655 4.60249L17.4485 6.88549" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
		</svg>
	)
}
