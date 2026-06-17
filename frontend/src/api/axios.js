import axios from 'axios'


const api = axios.create({
	baseURL: 'https://mern-notes-wine.vercel.app/api',
	withCredentials: true,
})

export default api
