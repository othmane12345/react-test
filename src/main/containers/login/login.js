import { Space, Input, Button } from 'antd';

function Login() {
    return (
        <div>
            <div>
                <Space direction="vertical">
                    <Input />
                    <Input.Password />
                    <Button type="primary">Submit</Button>
                </Space>
            </div>
        </div>
    );
}

export default Login;