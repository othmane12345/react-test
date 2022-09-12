import './login.scss';
import { Space, Input, Button, Typography } from 'antd';
const { Title } = Typography;

function Login() {
    return (
        <div className="main-wrap">
            <img className='image-animated' src="/x-hub.png"/>

            <div className="login-wrap">
                <Space direction="vertical" size="large" style={{width: '81%'}}>
                    <Title level={3}>Sign In</Title>

                    <Space direction="vertical" size="middle" style={{width: '100%'}}>
                        <Input placeholder='email or username *'/>
                        <Input.Password placeholder='password *' />
                    </Space>

                    <Button type="primary">Login</Button>
                </Space>
            </div>
        </div>
    );
}

export default Login;