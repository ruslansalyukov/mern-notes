import { useState } from "react"
import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Create from "./pages/Create"
import NoteDetails from "./pages/NoteDetails"
import Navbar from "./components/Navbar"
import { Toaster } from 'react-hot-toast'
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./routes/ProtectedRoute"
import PublicRoute from "./routes/PublicRoute"
import Welcome from "./pages/Welcome"
import { ReactLenis, useLenis } from 'lenis/react'

function App() {

	return (

		<div>
			<div className="container">
				<Navbar />
				<Routes>
					<Route path="/" element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					} />
					<Route path="/create" element={
						<ProtectedRoute>
							<Create />
						</ProtectedRoute>
					} />
					<Route path="/note/:id" element={
						<ProtectedRoute>
							<NoteDetails />
						</ProtectedRoute>
					} />
					<Route path="/welcome" element={
						<PublicRoute>
							<Welcome />
						</PublicRoute>
					}
					/>
					<Route path="/login" element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					} />
					<Route path="/register" element={
						<PublicRoute>
							<Register />
						</PublicRoute>
					} />
				</Routes>
				<Toaster />
				<ReactLenis root />
			</div>
		</div>

	)
}

export default App
