import './login.scss';
import { Space, Input, Button, Typography } from 'antd';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { connectUser } from '../../store/users/user-slice';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeUserName(newValue) {
        setUserName(newValue)
    }

    function handleChangePassword(newValue) {
        setPassword(newValue)
    }

    function connect() {
        dispatch(connectUser({userName, password}));
        navigate('/Home')
    }

    return (
        <div className="main-wrap">
            <img className='image-animated' src="/x-hub.png"/>

            <div className="login-wrap">
                <Space direction="vertical" size="large" style={{width: '81%'}}>
                    <Title level={3}>Sign In</Title>

                    <Space direction="vertical" size="middle" style={{width: '100%'}}>
                        <Input placeholder='email or username *' value={userName} onChange={(event) => handleChangeUserName(event.target.value)} />
                        <Input.Password placeholder='password *' value={password} onChange={(event) => handleChangePassword(event.target.value)} />
                    </Space>

                    <Button type="primary" onClick={() => connect()}>Login</Button>
                </Space>
            </div>
        </div>
    );
}

export default Login;