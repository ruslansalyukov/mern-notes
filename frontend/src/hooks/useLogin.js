import api from "../api/axios";
import { useQueryClient } from "@tanstack/react-query";


export const useLogin = () => {
	const queryClient = useQueryClient();
	const login = async (email, password) => {
		await api.post('/auth/login', { email, password })
		await queryClient.invalidateQueries({ queryKey: ['user'] })
	}
	return login
}
