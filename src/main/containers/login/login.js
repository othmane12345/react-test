import './login.scss';
import { Space, Input, Button, Typography, Form, notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { connectUser } from '../../store/users/user-slice';
import { initAllPosts } from '../../store/posts/post-slice';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        dispatch(connectUser(values));
        dispatch(initAllPosts())
        navigate('/Home')
    };
    
    const onFinishFailed = (errorInfo) => {
        notification.error({
            message: 'Error',
            description:
              `An error occurred while trying to connect please make sure you input the right informations!`,
            placement: 'bottomRight'
          });
    };

    return (
        <div className="main-wrap">
            <img className='image-animated' src="/x-hub.png"/>

            <div className="login-wrap">
                <Space direction="vertical" size="large" style={{width: '81%'}}>
                    <Title level={3}>Sign In</Title>

                    <Form className='form'
                        name="basic"
                        wrapperCol={{xs: {span: 24}, sm: {span: 24}}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                        name="userName"
                        rules={[{
                            required: true,
                            message: 'Please input your username!',
                        }]}>
                            <Input placeholder='email or username *' />
                        </Form.Item>

                        <Form.Item
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Please input your password!',
                        }]}
                        >
                            <Input.Password placeholder='password *' />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>Login</Button>
                        </Form.Item>
                    </Form>
                </Space>
            </div>
        </div>
    );
}

export default Login;