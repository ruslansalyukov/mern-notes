import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useAuthUser = () => {

	const API_URL = import.meta.env.VITE_API_URL

	return useQuery({
		queryKey: ['user'],
		queryFn: async () => {
			const res = await api.get(API_URL);
			return res.data
		},
		retry: false,
		staleTime: 1000 * 60 * 5,
	});
};
