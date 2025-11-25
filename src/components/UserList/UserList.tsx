import {List, Card, Button} from 'antd'
import styles from './UserList.module.scss'
import { Link } from 'react-router-dom'
import type {User} from "../../store/usersSlice.ts";
import {useTranslation} from "react-i18next";


interface UserListProps {
    users: User[]
    loading: boolean
}

export default function UserList({ users, loading }: UserListProps) {
    const { t } = useTranslation()

    return (
        <List
            loading={loading}
            grid={{ gutter: 16, column: 1 }}
            dataSource={users}
            renderItem={(user: User) => (
                <List.Item key={user.id}>
                    <Card
                        className={styles?.card || ''}
                        title={<Link to={`/users/${user.id}`}>{user.name}</Link>}
                        extra={
                        <div>
                            <Button type="link" disabled>{t('details')}</Button>
                            <Button type="link" disabled>{t('add')}</Button>
                        </div>
                        }>
                        <div>{user.email}</div>
                        <div>{user.company?.name}</div>
                    </Card>
                </List.Item>
            )}
        />
    )
}
