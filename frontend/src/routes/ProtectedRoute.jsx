import { Navigate } from 'react-router'
import { useAuthUser } from "../hooks/useAuthUser"

const ProtectedRoute = ({ children }) => {
	const { data: user, isLoading } = useAuthUser();

	if (isLoading) return null

	if (!user) {
		return <Navigate to='/welcome' replace />
	}

	return children;
}

export default ProtectedRoute
