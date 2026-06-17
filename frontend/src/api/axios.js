import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	// ❌ УБРАЛИ withCredentials
});

// 🔥 ДОБАВИЛИ INTERCEPTOR
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');

	if (token) {
		config.headers.Authorization = `Bearer ${token}`; // 🔥 ГЛАВНОЕ ИЗМЕНЕНИЕ
	}

	return config;
});

export default api;
