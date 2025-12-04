import { useEffect } from 'react'
import { Modal, Form, Input, Select, Button, message } from 'antd'
import { useAppDispatch } from '../../store/hooks'
import { postComment } from '../../api/api'
import { addComment as addCommentAction } from '../../store/slice/commentsSlice'
import type { User } from '../../store/slice/usersSlice'
import { useTranslation } from "react-i18next";
import styles from './AddCommentModal.module.scss'

const { TextArea } = Input

type Props = {
    open: boolean
    onClose: () => void
    initialUserId?: number | null
    users: User[]
}

type FormValues = {
    userId?: number
    email: string
    body: string
}

export default function AddCommentModal({ open, onClose, initialUserId = null, users }: Props) {
    const [form] = Form.useForm<FormValues>()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    useEffect(() => {
        if (initialUserId) {
            form.setFieldsValue({ userId: initialUserId })
        } else {
            form.resetFields()
        }
    }, [initialUserId, form, open])

    const handleOk = async () => {
        try {
            const values = await form.validateFields()
            const userId = values.userId ?? initialUserId
            if (!userId) {
                message.error(t('selectUserError'))
                return
            }

            const payload = {
                postId: userId,
                body: values.body,
                email: values.email
            }

            const res = await postComment(payload)

            const created = {
                id: res.data?.id ?? Date.now(),
                postId: payload.postId,
                body: payload.body,
                email: payload.email
            }

            dispatch(addCommentAction(created))

            message.success(t('commentAdded'))
            onClose()
            form.resetFields()
        } catch (err: any) {
            if (err && err.errorFields) {
                return
            }
        }
    }

    return (
        <Modal
            className={styles.modal}
            title={<span className={styles.title}>{t('addCommentModal')}</span>}
            open={open}
            onCancel={() => { onClose(); form.resetFields() }}
            footer={[
                <Button key="cancel" onClick={() => { onClose(); form.resetFields() }} className={styles.btnCancel}>
                    {t('cancelModal')}
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk} className={styles.btnPrimary}>
                    {t('addItemsModal')}
                </Button>
            ]}
        >
            <div>
                <Form className={styles.content} form={form} layout="vertical" initialValues={{ email: '', body: '' }}>
                    {!initialUserId && (
                        <Form.Item
                            name="userId"
                            label={t('userList')}
                            rules={[{ required: true, message: t('selectUser') }]}
                            className={styles.formItem}
                        >
                            <Select
                                showSearch
                                placeholder={t('selectUser')}
                                optionFilterProp="children"
                                className={styles.select}
                                filterOption={(input, option) =>
                                    (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {users.map((u) => (
                                    <Select.Option key={u.id} value={u.id}>
                                        {u.name} ({u.email})
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}

                    {initialUserId && (
                        <div className={styles.forUser}>
                            <strong>{t('forUser')}:</strong>{' '}
                            {users.find((u) => u.id === initialUserId)?.name || `ID ${initialUserId}`}
                        </div>
                    )}

                    <Form.Item
                        name="email"
                        label={t('authorEmail')}
                        rules={[
                            { required: true, message: t('enterEmail') },
                            { type: 'email', message: t('invalidEmail') }
                        ]}
                        className={styles.formItem}
                    >
                        <Input placeholder="author@example.com" className={styles.input} />
                    </Form.Item>

                    <Form.Item
                        name="body"
                        label={t('commentBody')}
                        rules={[{ required: true, message: t('enterComment') }]}
                        className={styles.formItem}
                    >
                        <TextArea rows={5} className={styles.textarea} />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}
