import { useEffect } from 'react'
import { Modal, Form, Input, Select, Button, message } from 'antd'
import { useAppDispatch } from '../../store/hooks'
import { postComment } from '../../api/api'
import { addComment as addCommentAction } from '../../store/slice/commentsSlice'
import type { User } from '../../store/slice/usersSlice'
import { useTranslation } from "react-i18next";

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
            title={t('addCommentModal')}
            open={open}
            onCancel={() => { onClose(); form.resetFields() }}
            footer={[
                <Button key="cancel" onClick={() => { onClose(); form.resetFields() }}>
                    {t('cancelModal')}
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    {t('addItemsModal')}
                </Button>
            ]}
        >
            <Form form={form} layout="vertical" initialValues={{ email: '', body: '' }}>
                {!initialUserId && (
                    <Form.Item
                        name="userId"
                        label={t('userList')}
                        rules={[{ required: true, message: t('selectUser') }]}
                    >
                        <Select
                            showSearch
                            placeholder={t('selectUser')}
                            optionFilterProp="children"
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
                    <div style={{ marginBottom: 12 }}>
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
                >
                    <Input placeholder="author@example.com" />
                </Form.Item>

                <Form.Item
                    name="body"
                    label={t('commentBody')}
                    rules={[{ required: true, message: t('enterComment') }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    )
}
