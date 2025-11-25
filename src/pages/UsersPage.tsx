import {useAppDispatch, useAppSelector} from '../store/hooks'
import {loadUsers} from '../store/usersSlice.ts'
import UserList from '../components/UserList/UserList'
import {Alert, Button, Input} from "antd";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";

export default function UsersPage() {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { list, loading, error } = useAppSelector((state) => state.users)
    useEffect(() => {
        dispatch(loadUsers())
    }, [dispatch])

    return (
        <div>
            <div style={{marginBottom: 12, display: 'flex', gap: 8}}>
                <Input placeholder={t('filterPlaceholder')}/>
                <Button>{t('addComment')}</Button>
            </div>

            {error && (
                <Alert
                    type="error"
                    title={t('errorLoadingUsers')}
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            )}

            <UserList users={list} loading={loading}/>
        </div>
    )
}
