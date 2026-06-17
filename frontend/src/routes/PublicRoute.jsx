import { Navigate } from 'react-router'
import { useAuthUser } from "../hooks/useAuthUser"

const PublicRoute = ({ children }) => {
	const { data: user, isLoading } = useAuthUser();

	if (isLoading) return null

	if (user) {
		return <Navigate to='/' replace />
	}

	return children;
}

export default PublicRoute
