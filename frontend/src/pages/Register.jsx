import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import api from "../api/axios.js";
import toast from "react-hot-toast";

import { ArrowLeftIcon, Eye, EyeOff } from "lucide-react";
import { AnimatePresence, motion } from 'motion/react'


import { useForm } from 'react-hook-form';
import { email, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'


const schema = z.object({
	email: z.string().min(1, 'Required field').email('Incorrect email address'),
	password: z.string().min(1, 'Required field').min(8, 'The password must be at least 8 characters long')
})

const Register = () => {

	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	const {
		register, handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});


	const handleRegister = async (data) => {

		setLoading(true)
		try {
			await api.post('/auth/register', {
				email: data.email,
				password: data.password,
			});
			toast.success('Account has been created successfully')
			navigate('/login')
		} catch (error) {
			toast.error(error.response?.data?.message || "Error")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="py-15 px-5 md:px-10">
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-135 m-auto">
				<div className="mb-5 w-max">
					<Link to={'/'} className="flex items-center gap-2 btn btn-soft w-max text-black p-2 rounded-sm">
						<ArrowLeftIcon />
						<h2 className="">Back to home</h2>
					</Link>
				</div>
				<form onSubmit={handleSubmit(handleRegister)} className="w-full h-full border border-white/24 p-7 rounded-2xl">
					<div className="flex flex-col gap-5">
						<h2 className="text-2xl logo">Create Account</h2>
						<h2>Enter your credentials to create your account.</h2>
						<div>
							<label htmlFor="email" className="text-xl">Email</label>
							<input
								{...register('email')}
								name="email"
								id="email"
								placeholder="Enter your email"
								autoComplete="email"
								className="w-full rounded-sm bg-[#222] outline-0 p-2 text-neutral-400 mt-3"
							/>
							{errors.email && (
								<p className="text-red-500 text-sm mt-1">
									{errors.email.message}
								</p>
							)}
						</div>
						<div className="relative">
							<div className="relative">
								<label htmlFor="password" className="text-xl">Password</label>
								<input
									{...register('password')}
									type={showPassword ? "text" : "password"}
									name="password"
									id="password"
									placeholder="Enter your password"
									autoComplete="current-password"
									className="w-full rounded-sm bg-[#222] outline-0 p-2 text-neutral-400 mt-3"

								/>
								<div className="absolute right-3 top-10/12 -translate-y-10/12 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <AnimatePresence mode="wait"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=""><Eye /></motion.div></AnimatePresence> : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=""><EyeOff /></motion.div>}</div>
							</div>
							{errors.password && (
								<p className="text-red-500 text-sm mt-1">
									{errors.password.message}
								</p>
							)}
						</div>
						<div className="flex items-center justify-between gap-3">
							<div>Already have an account? <Link to={'/login'}> Sign In</Link></div>
							<button type="submit" className="btn btn-soft disabled:bg-[#222]" disabled={loading}>
								{loading ? "Signing up..." : "Sign up"}
							</button>
						</div>
					</div>
				</form>
			</motion.div>
		</div>
	);
}

export default Register;
