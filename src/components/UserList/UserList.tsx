import {List, Card, Button, type PaginationProps} from 'antd'
import styles from './UserList.module.scss'
import { Link } from 'react-router-dom'
import type {User} from "../../store/usersSlice.ts";
import {useTranslation} from "react-i18next";
import {useState} from "react";


interface UserListProps {
    users: User[]
    loading: boolean
    initialPageSize?: number
}

export default function UserList({ users, loading, initialPageSize = 10 }: UserListProps) {
    const { t } = useTranslation()

    const paginationLocale: PaginationProps['locale'] = {
        items_per_page: ` / ${t('perPage')}`
    }

    const [current, setCurrent] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(initialPageSize)

    const pagination = {
        current,
        pageSize,
        total: users.length,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50'],
        locale: paginationLocale,
        showTotal: (total: number) => `${t('totalListUsers')}: ${total}`,
        onChange: (page: number, newPageSize?: number) => {
            setCurrent(page)
            if (newPageSize && newPageSize !== pageSize) {
                setPageSize(newPageSize)
                setCurrent(1)
            }
        }
    }

    return (
        <List
            loading={loading}
            grid={{ gutter: 16, column: 1 }}
            dataSource={users}
            pagination={pagination}
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
