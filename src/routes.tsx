import { Routes, Route } from 'react-router-dom'
import UsersPage from './pages/UsersPage/UsersPage.tsx'
import UserDetailPage from "./pages/UserDetailPage/UserDetailPage.tsx";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
    )
}

