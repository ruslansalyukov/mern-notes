import toast from "react-hot-toast";
import api from "../api/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogout = () => {
    const queryClient = useQueryClient();
	const navigate = useNavigate()

    const logout = async () => {
        await api.post('/auth/logout');
        localStorage.removeItem('token');
        queryClient.clear();
		navigate('/welcome')
        toast.success('You have successfully logged out of your account');
    };

    return logout;
};
