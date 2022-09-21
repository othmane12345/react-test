import { Button, Form, Input, Typography, notification, Row, Space, Select} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addNewUserAction, updateUser } from '../../store/users/user-slice';
import './user-form.scss';

const { Title, Text } = Typography;
const { Option } = Select;

function UserForm({usage, closeModal}) {
    const [form] = Form.useForm();
    const userInformation = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch();

    const onFinish = (values) => {
        if (usage === 'add') {
            dispatch(addNewUserAction({...values}));
            notification.success({
                message: 'Success',
                description: `The User was Added successfully!`,
                placement: 'bottomRight'
              });
            closeModal();
        } else {
            dispatch(updateUser({updatedUser: {...userInformation, ...values}}));
            notification.success({
                message: 'Success',
                description: `The User was updated successfully!`,
                placement: 'bottomRight'
              });
        }

    };
    
    const onFinishFailed = (errorInfo) => {
        if (usage === 'add') {
            notification.error({
                message: 'Error',
                description:
                  `An error occurred while creating user please make sure that the all informations are correct before proceding!`,
                placement: 'bottomRight'
              });
        } else {
            notification.error({
                message: 'Error',
                description:
                  `An error occurred while updating user information please make sure that the all informations are correct before proceding!`,
                placement: 'bottomRight'
              });
        }

    };

    return (
        <Space className="form-wrapper" direction="vertical">
            <Title level={3}>User Information</Title>

            <Form className='form'
             form={form}
             name="basic"
             labelCol={{xs: {span: 24}, sm: {span: 4}}}
             wrapperCol={{xs: {span: 24}, sm: {span: 20}}}
             initialValues={usage === 'add' ? {} : {...userInformation, confirm: userInformation.password}}
             onFinish={onFinish}
             onFinishFailed={onFinishFailed}
             autoComplete="off"
             >
                <Form.Item
                label="Name"
                name="name"
                rules={[{
                    required: true,
                    message: 'Please input your username!',
                }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                label="Username"
                name="username"
                rules={[{
                    required: true,
                    message: 'Please input your username!',
                }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                label="Password"
                name="password"
                rules={[{
                    required: true,
                    message: 'Please input your password!',
                }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                         required: true,
                         message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                    ]}>
                        <Input.Password />
                </Form.Item>

                <Form.Item
                label="Email"
                name="email"
                rules={[{
                    type: 'email',
                    required: true,
                    message: 'Please input a valid email!',
                }]}
                >
                    <Input placeholder='email'/>
                </Form.Item>

                <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{
                    required: true,
                    message: 'Please input your phone number!',
                }, {
                    pattern: '^[0-9-x]*$',
                    message: 'Please input a valid phone number!',
                }]}
                >
                    <Input />
                </Form.Item>

                {usage === 'add' ? <Form.Item
                label="Authorization"
                name="authorization"
                rules={[{
                    required: true,
                    message: 'Please choose a role',
                }]}
                >
                    <Select>
                        <Option value="Admin">Administrator</Option>
                        <Option value="User">User</Option>
                    </Select>
                </Form.Item> : null}

                <Text strong>Address</Text>

                <Form.Item label="Street">
                    <Form.Item name={['address', 'street']}
                         style={{ display: 'inline-block', width: 'calc(44% - 10px)', paddingRight: '15px'}}>
                        <Input placeholder='Street'/>
                    </Form.Item>

                    <Form.Item label="City" name={['address', 'city']}
                        style={{ display: 'inline-block', width: 'calc(30% - 10px)', paddingRight: '15px' }}>
                        <Input placeholder='City'/>
                    </Form.Item>

                    <Form.Item label="Zip Code" name={['address', 'zipcode']}
                        style={{ display: 'inline-block', width: '27%' }}>
                        <Input placeholder='Zip Code'/>
                    </Form.Item>
                </Form.Item>

                <Text strong>Company</Text>

                <Form.Item
                label="Website"
                name="website"
                rules={[{
                    type: 'url', 
                    warningOnly: true ,
                }]}
                >
                    <Input placeholder='website'/>
                </Form.Item>

                <Form.Item label="Name">
                    <Form.Item name={['company', 'name']}
                         style={{ display: 'inline-block', width: 'calc(25% - 15px)', paddingRight: '15px' }}>
                        <Input placeholder='Name'/>
                    </Form.Item>

                    <Form.Item label="Catch Phrase" name={['company', 'catchPhrase']}
                        style={{ display: 'inline-block', width: 'calc(42% - 15px)', paddingRight: '15px' }}>
                        <Input placeholder='City'/>
                    </Form.Item>

                    <Form.Item label="Buisness Model" name={['company', 'bs']}
                        style={{ display: 'inline-block', width: '35%' }}>
                        <Input placeholder='Buisness Model'/>
                    </Form.Item>
                </Form.Item>

                {usage === 'add' ? 
                <div>
                    <hr/>
                    <Row justify="end" align="middle" style={{marginTop: '20px'}}>
                        <Button type="default" onClick={() => closeModal()} style={{marginRight: '10px'}}>Cancel</Button>
                        <Form.Item style={{marginBottom: '0'}}>
                            <Button type="primary" htmlType="submit">
                                Create
                            </Button>
                        </Form.Item>
                    </Row>
                </div> :
                <Form.Item wrapperCol={{ span: 4, offset: 20 }}>
                    <Button type="primary" htmlType="submit" block>
                        Submit
                    </Button>
                </Form.Item>
                }

             </Form>
        </Space>
    );
}

export default UserForm;