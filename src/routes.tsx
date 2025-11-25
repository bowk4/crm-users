import { Routes, Route } from 'react-router-dom'
import UsersPage from './pages/UsersPage'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<UsersPage />} />
        </Routes>
    )
}

