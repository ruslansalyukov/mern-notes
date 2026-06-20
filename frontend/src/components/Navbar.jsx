import { Link } from "react-router";
import { useAuthUser } from "../hooks/useAuthUser";
import { useLogout } from "../hooks/useLogout";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { TextAlignJustify, X } from 'lucide-react'
import { maskEmail } from "../lib/utils";

const Navbar = () => {

	const { data: user, isLoading } = useAuthUser();
	const logout = useLogout();

	const [isHidden, setIsHidden] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const closeMenu = () => setIsOpen(false);

	if (isLoading) return null

	return (
		<>
			<header className="pt-10 sticky top-0 z-50">
				{/* Desktop nav */}
				<nav className="flex items-center justify-between gap-10 bg-white/2 border border-white/5 backdrop-blur-sm p-3 rounded-full font-jakarta relative z-50">
					<a href="/" className="logo relative ml-2">Notes</a>
					<div className="flex items-center gap-3">
						{user ? (<>
							<span className="absolute left-24 top-4 w-2 h-2 bg-success rounded-full animate-pulse"></span>
							{/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="">
								<Link to={'/create'}><button className="hidden md:block btn btn-soft rounded-full">Create note</button></Link>
							</motion.div> */}
							<motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => { setIsHidden(!isHidden) }} className="btn rounded-full cursor-pointer">Account</motion.button> {/* onClick={logout} */}
						</>) : (<>
							<div onClick={() => setIsOpen(!isOpen)} className="md:hidden z-50">
								<div className="mr-2">{isOpen ? <X /> : <TextAlignJustify />}</div>
							</div>
							<div className="hidden md:flex items-center gap-7">
								<Link to={'/login'}><motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="cursor-pointer">Sign In</motion.button></Link>
								<Link to={'/register'}><motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="btn btn-soft rounded-full">Get Started</motion.button></Link>
							</div>
						</>)}

					</div>
				</nav>

				{/* Account toggle */}
				{user &&
					<AnimatePresence>
						{isHidden &&
							<>	<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={closeMenu}
								className="fixed inset-0 bg-[#222]/24 backdrop-blur-sm"
							/>
								<motion.div
									initial={{ opacity: 0, x: 50 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 50 }}
									transition={{ duration: 0.4, ease: 'easeOut' }}
									className="absolute top-28 right-4 z-50 w-50 rounded-2xl border border-white/10 bg-black/10 backdrop-blur-sm shadow-xl flex flex-col items-center justify-center gap-3 py-6 px-4 "
								>
									<h2 className="text-neutral-300 text-sm">{maskEmail(user?.email)}</h2>
									<div className="flex items-center gap-3">
										<IconlyLogin />
										<h2 onClick={logout} className="text-red-400 cursor-pointer">Log Out</h2>
									</div>
								</motion.div>
							</>
						}
					</AnimatePresence>
				}
				{/* Mobile nav */}
				<AnimatePresence>
					{isOpen && (
						<>
							{/* overlay (затемнение + blur фона) */}
							{/* <motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={closeMenu}
								className="fixed inset-0 bg-[#222]/24 backdrop-blur-sm"
							/> */}
							{/* glass menu */}
							<motion.div
								initial={{ opacity: 0, y: -15, x: 20, scaleX: 0.7 }}
								animate={{ opacity: 1, y: 0, x: 0, scaleX: 1 }}
								exit={{ opacity: 0, y: -25, x: 30, scaleX: 0.7 }}
								transition={{ duration: 0.18 }}
								className="absolute top-28 right-4 z-50 w-50 rounded-2xl border border-white/10 bg-black/10 backdrop-blur-sm shadow-xl flex flex-col items-center gap-3 py-6 px-4 "
							>
								<Link to="/login" onClick={closeMenu}>
									<button className="text-white cursor-pointer">Sign In</button>
								</Link>
								<Link to="/register" onClick={closeMenu}>
									<button className="btn rounded-full">
										Get Started
									</button>
								</Link>
							</motion.div>
						</>
					)}
				</AnimatePresence>
			</header>
		</>
	);
}

export default Navbar;


export const IconlyLogin = ({ size = 24, color = "#ff6467" }) => {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
			<title>Log Out</title>
			<g id="Iconly/Light-Outline/Login" stroke="none" strokeWidth="1.5" fill="none" fillRule="evenodd">
				<g id="Login" transform="translate(3.000000, 2.000000)" fill={color}>
					<path d="M14.053,0 C16.492,0 18.478,1.985 18.478,4.425 L18.478,15.564 C18.478,18.01 16.487,20 14.042,20 L9.157,20 C6.718,20 4.733,18.015 4.733,15.575 L4.733,14.633 C4.733,14.219 5.069,13.883 5.483,13.883 C5.897,13.883 6.233,14.219 6.233,14.633 L6.233,15.575 C6.233,17.187 7.545,18.5 9.157,18.5 L14.042,18.5 C15.661,18.5 16.978,17.184 16.978,15.564 L16.978,4.425 C16.978,2.813 15.665,1.5 14.053,1.5 L9.168,1.5 C7.55,1.5 6.233,2.816 6.233,4.434 L6.233,5.367 C6.233,5.781 5.897,6.117 5.483,6.117 C5.069,6.117 4.733,5.781 4.733,5.367 L4.733,4.434 C4.733,1.989 6.723,0 9.168,0 L14.053,0 Z M10.3923,6.553 L13.32125,9.46975 C13.3450062,9.49350625 13.3671777,9.51884734 13.3875914,9.54560044 L13.3213,9.469 C13.3612287,9.50836634 13.3961762,9.55184414 13.4257868,9.59843296 C13.4318468,9.61010737 13.438669,9.62151555 13.4451917,9.63311442 C13.4566029,9.65101613 13.4662591,9.6700434 13.4750815,9.68944319 C13.480071,9.7031962 13.48582,9.71688328 13.4911676,9.73076915 C13.4997074,9.74977474 13.5063094,9.76931306 13.5121001,9.78910914 C13.5154634,9.80470095 13.5194749,9.82025822 13.5229909,9.8360017 C13.5284509,9.85506905 13.5319637,9.87425098 13.5347286,9.89358117 C13.5347515,9.90236695 13.5358957,9.91159954 13.5368703,9.92088238 C13.5409073,9.9472797 13.5423,9.97357815 13.5423,10 L13.535,10.079 L13.5341493,10.1017257 C13.5339188,10.103423 13.5336827,10.1051185 13.5334408,10.1068122 L13.5423,10 C13.5423,10.0555105 13.5361529,10.1104764 13.5242059,10.1639208 C13.5194749,10.1797418 13.5154634,10.195299 13.5109738,10.2106529 C13.5063094,10.2306869 13.4997074,10.2502253 13.4923127,10.2694533 C13.48582,10.2831167 13.480071,10.2968038 13.4739348,10.3102778 C13.4662591,10.3299566 13.4566029,10.3489839 13.4461336,10.3675805 C13.438669,10.3784844 13.4318468,10.3898926 13.4247356,10.4010996 C13.4139611,10.4201734 13.4012842,10.4382836 13.3877787,10.4558338 C13.3785549,10.4662048 13.3699587,10.476822 13.3610846,10.4871944 C13.34907,10.50248 13.3355,10.517 13.3213,10.531 L10.3923,13.446 C10.2463,13.592 10.0543,13.665 9.8633,13.665 C9.6713,13.665 9.4783,13.592 9.3323,13.444 C9.0393,13.15 9.0413,12.676 9.3343,12.384 L10.975,10.75 L0.75,10.75 C0.336,10.75 -6.03961325e-14,10.414 -6.03961325e-14,10 C-6.03961325e-14,9.586 0.336,9.25 0.75,9.25 L10.975,9.25 L9.3343,7.615 C9.0413,7.323 9.0393,6.849 9.3323,6.555 C9.6253,6.261 10.0993,6.261 10.3923,6.553 Z" id="Combined-Shape"></path>
				</g>
			</g>
		</svg>
	)
}

export const IconlyProfile = ({ size = 24, color = "#000000" }) => {
	return (
		<svg width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" clipRule="evenodd" d="M12.2505 13.8307C8.33752 13.8307 4.90552 16.1327 4.90552 18.7557C4.90552 22.1307 10.4345 22.1307 12.2505 22.1307C14.0665 22.1307 19.5945 22.1307 19.5945 18.7337C19.5945 16.1217 16.1625 13.8307 12.2505 13.8307Z" fill={color}></path>
			<path fillRule="evenodd" clipRule="evenodd" d="M12.212 11.6423H12.243C14.938 11.6423 17.13 9.45026 17.13 6.75526C17.13 4.06126 14.938 1.86926 12.243 1.86926C9.54805 1.86926 7.35605 4.06126 7.35605 6.75326C7.34705 9.43926 9.52405 11.6323 12.212 11.6423Z" fill={color}></path>
		</svg>
	)
}
