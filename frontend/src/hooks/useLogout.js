import toast from "react-hot-toast";
import api from "../api/axios";
import { useQueryClient } from "@tanstack/react-query";



export const useLogout = () => {
	const queryClient = useQueryClient();
	const logout = async () => {
		await api.post('/auth/logout')
		queryClient.setQueryData(['user'], null)
		toast.success('You have successfully logged out of your account')
	}
	return logout;
}
