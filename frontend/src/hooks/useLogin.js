import api from "../api/axios";
import { useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
	const queryClient = useQueryClient();

	const login = async (email, password) => {
		// 🔥 1. ПОЛУЧАЕМ TOKEN
		const res = await api.post('/auth/login', { email, password });

		const token = res.data.token; // ✅ ДОБАВИЛИ

		// 🔥 2. СОХРАНЯЕМ TOKEN
		localStorage.setItem('token', token); // ✅ ДОБАВИЛИ

		// 🔥 3. ОБНОВЛЯЕМ USER QUERY
		await queryClient.invalidateQueries({ queryKey: ['user'] });

		return res.data;
	};

	return login;
};
