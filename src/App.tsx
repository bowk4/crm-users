import {Layout, Select} from 'antd'
import {useTranslation} from 'react-i18next'
import Router from "./routes.tsx";

const {Header, Content} = Layout

export default function App() {
    const {i18n, t} = useTranslation()
    return (
        <Layout className="app-container">
            <Header style={{background: 'transparent', padding: 0, marginBottom: 16}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2 style={{margin: 0}}>{t('title')}</h2>
                    <div>
                        <Select value={i18n.language} onChange={(lng) => i18n.changeLanguage(lng)} style={{width: 120}}>
                            <Select.Option value="en">EN 🇬🇧</Select.Option>
                            <Select.Option value="cs">CZ 🇨🇿</Select.Option>
                        </Select>
                    </div>
                </div>
            </Header>
            <Content>
                <Router/>
            </Content>
        </Layout>
    )
}

