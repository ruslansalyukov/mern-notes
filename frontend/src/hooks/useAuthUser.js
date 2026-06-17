import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useAuthUser = () => {
	return useQuery({
		queryKey: ['user'],
		queryFn: async () => {
			const res = await api.get('/auth/me');
			return res.data
		},
		retry: false,
		staleTime: 1000 * 60 * 5,
	});
};
