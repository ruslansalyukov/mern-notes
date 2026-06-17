import axios from 'axios';

const api = axios.create({
	baseURL: 'https://mern-notes-wine.vercel.app/api',
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
