import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { Link } from "react-router";

const Welcome = () => {

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-14 px-5 md:px-10">
			<div className="flex flex-col text-center gap-5 max-w-150 m-auto">
				<h2 className="text-3xl logo">✦ Welcome to Notes</h2>
				<p className="text-xl text-neutral-200">Capture ideas, organize thoughts,
					and keep everything important
					in one place.
				</p>

				<p className="text-xl text-neutral-200 ">Whether it's a quick reminder,
					meeting notes, study materials,
					or your next big project —
					your notes are always available
					when you need them.
				</p>

				<p className="text-xl text-neutral-200">Create an account to securely save,
					sync, and access your notes across
					all your devices.
				</p>

				<div className="text-xl">
					<ul className="flex flex-col items-center gap-3">
						<motion.li whileHover={{ scale: 1.3 }} className="hero-button text-blue-400">✓ Fast</motion.li>
						<div className="bg-linear-to-r from-transparent via-neutral-700 to-transparent h-px w-30"></div>
						<motion.li whileHover={{ scale: 1.3 }} className="hero-button text-green-400">✓ Secure</motion.li>
						<div className="bg-linear-to-r from-transparent via-neutral-700 to-transparent h-px w-30"></div>
						<motion.li whileHover={{ scale: 1.3 }} className="hero-button text-indigo-400">✓ Beautiful</motion.li>
						<div className="bg-linear-to-r from-transparent via-neutral-700 to-transparent h-px w-30"></div>
						<motion.li whileHover={{ scale: 1.3 }} className="hero-button text-red-400">✓ Access from anywhere</motion.li>
						<div className="bg-linear-to-r from-transparent via-neutral-700 to-transparent h-px w-30"></div>
					</ul>
				</div>
				<div className="">
					<Link to={'/register'}><button className="btn btn-soft rounded-full w-full md:w-[215px] h-[48px]">Get Started</button></Link>
				</div>
				<p className="mt-25 text-neutral-400">By continuing, you agree to our
					Terms of Service and Privacy Policy.
				</p>
			</div>
			<div className="bg-linear-to-r mt-3 from-transparent via-neutral-700 to-transparent h-px w-full"></div>
		</motion.div>
	);
}

export default Welcome;
