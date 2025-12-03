import {useAppDispatch, useAppSelector} from '../../store/hooks.ts'
import {loadUsers, type User} from '../../store/slice/usersSlice.ts'
import UserList from '../../components/UserList/UserList.tsx'
import {Alert, Button, Input} from "antd";
import {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import AddCommentModal from '../../components/AddCommentModal/AddCommentModal'
import styles from './UsersPage.module.scss'

export default function UsersPage() {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { list, loading, error } = useAppSelector((state) => state.users)
    const [filter, setFilter] = useState('')

    const [modalOpen, setModalOpen] = useState(false)
    const [modalUserId, setModalUserId] = useState<number | null>(null)

    useEffect(() => {
        dispatch(loadUsers())
    }, [dispatch])

    const filtered = useMemo(() => {
        const q = filter.toLowerCase()

        return list.filter((u: User) => {
            const name = u.name.toLowerCase()
            const company = u.company?.name?.toLowerCase() ?? ''
            return name.includes(q) || company.includes(q)
        })
    }, [filter, list])

    const openAddCommentForUser = (userId?: number | null) => {
        setModalUserId(userId ?? null)
        setModalOpen(true)
    }

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <Input
                    className={styles.search}
                    placeholder={t('filterPlaceholder')}
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    allowClear
                />
                <Button className={styles.addBtn} onClick={() => openAddCommentForUser(null)}>
                    {t('addComment')}
                </Button>
            </div>

            {error && (
                <Alert
                    type="error"
                    title={t('errorLoadingUsers')}
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            )}

            <div className={styles.listWrapper}>
                <UserList users={filtered} loading={loading} onOpenAddComment={(userId) => openAddCommentForUser(userId)} />
            </div>

            <AddCommentModal
                open={modalOpen}
                onClose={() => { setModalOpen(false); setModalUserId(null) }}
                initialUserId={modalUserId ?? undefined}
                users={list}
            />
        </div>
    )
}
