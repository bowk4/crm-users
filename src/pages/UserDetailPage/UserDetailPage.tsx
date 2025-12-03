import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect, useState } from 'react'
import { loadUsers } from '../../store/slice/usersSlice'
import { loadCommentsByUser, clearComments } from '../../store/slice/commentsSlice'
import { Alert, Button, Card, List, Skeleton } from 'antd'
import styles from './UserDetailPage.module.scss'
import AddCommentModal from '../../components/AddCommentModal/AddCommentModal'

export default function UserDetailPage() {
    const { id } = useParams<{ id: string }>()
    const userId = Number(id)
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const users = useAppSelector((s) => s.users.list)
    const usersLoading = useAppSelector((s) => s.users.loading)
    const usersError = useAppSelector((s) => s.users.error)

    const comments = useAppSelector((s) => s.comments.list)
    const commentsLoading = useAppSelector((s) => s.comments.loading)
    const commentsError = useAppSelector((s) => s.comments.error)

    const user = users.find((u) => u.id === userId)

    useEffect(() => {
        if (!users.length && !usersLoading && !usersError) {
            dispatch(loadUsers())
        }
    }, [users.length, usersLoading, usersError, dispatch])

    useEffect(() => {
        if (userId && !Number.isNaN(userId)) {
            dispatch(loadCommentsByUser(userId))
        }
        return () => {
            dispatch(clearComments())
        }
    }, [userId, dispatch])

    const [modalOpen, setModalOpen] = useState(false)

    if (usersLoading) return <Skeleton active />
    if (usersError) {
        return (
            <Alert
                type="error"
                title={t('serverError')}
                showIcon
            />
        )
    }

    if (!user) {
        return (
            <Alert
                type="warning"
                title={t('userNotFound')}
                showIcon
            />
        )
    }

    return (
        <Card title={user.name}
              extra={
                  <div>
                      <Button onClick={() => setModalOpen(true)}>{t('addComment') }</Button>
                  </div>
              }>

            <div className={styles.userInfo}>
                <p><strong>{t('email')}:</strong> {user.email}</p>
                <p><strong>{t('nameCompany')}:</strong> {user.company?.name}</p>
                <p><strong>{t('cityUser')}:</strong> {user.address?.city ?? '-'}</p>
                <p><strong>{t('usernameUser')}:</strong> {user.username ?? '-'}</p>
                <p>
                    <strong>{t('websiteUser')}:</strong>{' '}
                    {user.website ? (
                        <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                            {user.website}
                        </a>
                    ) : (
                        '-'
                    )}
                </p>
            </div>

            <h3 className={styles.title_comments}>{t('comments')}</h3>

            {commentsLoading ? (
                <Skeleton active paragraph={{ rows: 2 }} />
            ) : commentsError ? (
                <Alert
                    type="error"
                    title={t('serverError')}
                    showIcon
                />
            ) : comments.length === 0 ? (
                <Alert
                    type="info"
                    title={t('noComments')}
                    showIcon
                />
            ) : (
                <List
                    dataSource={comments}
                    renderItem={(c, index) => (
                        <List.Item key={c.id}>
                            <div className={styles.comments_numberWrapper}>
                                <p className={styles.comments_numberList}>{index + 1}</p>
                            </div>
                            <List.Item.Meta title={c.email} description={c.body} />
                        </List.Item>
                    )}
                />
            )}

            <AddCommentModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                initialUserId={user.id}
                users={users}
            />
        </Card>
    )
}
