import axios from 'axios'

const API = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com' })

export const fetchUsers = () => API.get('/users')
export const fetchComments = () => API.get('/comments')
export const postComment = (payload: any) => API.post('/comments', payload)
