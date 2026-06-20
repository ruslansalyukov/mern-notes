import { useState } from "react";
import { useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import { useLogin } from "../hooks/useLogin.js";

import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeftIcon, Eye, EyeOff } from "lucide-react";

import { useForm } from 'react-hook-form';
import { email, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'


const schema = z.object({
	email: z.string().min(1, 'Required field').email('Incorrect email address'),
	password: z.string().min(1, 'Required field').min(8, 'The password must be at least 8 characters long')
})

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const login = useLogin()
	const navigate = useNavigate()

	const {
		register, handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});


	const handleLogin = async (data) => {
		setLoading(true)
		try {
			await login(data.email, data.password)
			navigate('/')
			toast.success('The login was completed successfully')
		} catch (error) {
			toast.error('Invalid email or password')
			// alert(error.response?.data?.message || "Error")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="mt-10">
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-135 m-auto">
				<div className="mb-5 w-max">
					<Link to={'/'} className="flex items-center gap-2 btn btn-soft text-black p-2 rounded-full">
						<ArrowLeftIcon />
						<h2>Back to home</h2>
					</Link>
				</div>
				<form onSubmit={handleSubmit(handleLogin)} className="w-full h-full border border-white/15 p-7 rounded-4xl">
					<div className="flex flex-col gap-5">
						<h2 className="text-2xl logo">Login</h2>
						<h2>Enter your credentials to access your account.</h2>
						<div>
							<label htmlFor="email" className="text-xl">Email</label>
							<input
								{...register('email')}
								name="email"
								id="email"
								placeholder="Enter your email"
								autoComplete="email"
								className="w-full rounded-lg bg-white/5 outline-0 p-2 text-neutral-400 mt-3"
							/>
							{errors.email && (
								<p className="text-red-500 text-sm mt-1">
									{errors.email.message}
								</p>
							)}
						</div>
						<div>
							<div className="relative ">
								<label htmlFor="password" className="text-xl">Password</label>
								<input
									{...register('password')}
									type={showPassword ? "text" : "password"}
									name="password"
									id="password"
									placeholder="Enter your password"
									autoComplete="current-password"
									className="w-full rounded-lg bg-white/5 outline-0 p-2 text-neutral-400 mt-3"

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
							<div className="text-sm">Don't have an account yet? <Link to={'/register'} className="text-neutral-400"> Sign Up</Link></div>
							<button className="btn btn-soft rounded-full disabled:bg-white/5" disabled={loading}>
								{loading ? "Signing in..." : "Sign in"}
							</button>
						</div>
					</div>
				</form>
			</motion.div>
		</div>
	);
}

export default Login;
