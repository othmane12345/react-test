import { Typography, Space, Table, Tooltip, Popconfirm, Button, Row, Modal, notification} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './user-list.scss';
import { deleteUser } from '../../store/users/user-slice';
import { useState } from 'react';
import UserForm from '../user-form/user-form';
import _ from 'lodash';

const { Text, Title } = Typography;

function UserList() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector(state => _.filter(state.user.users, item => item.id !== state.user.currentUser.id));

    const deleteUserAction = (data) => {
      dispatch(deleteUser(data.id));
      notification.success({
        message: 'Success',
        description: `The User was deleted successfully!`,
        placement: 'bottomRight'
      });
    }

    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filterSearch: true,
        width: '15%',
        onFilter: (value, record) => record.name.includes(value),
        render: (text) => <span>{text}</span>,
      }, {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        width: '15%',
        filterSearch: true,
        onFilter: (value, record) => record.userName.includes(value),
        render: (text) => <span>{text}</span>,
      }, {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '20%',
        filterSearch: true,
        onFilter: (value, record) => record.email.includes(value),
        render: (text) => <a>{text}</a>,
      }, {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: '15%',
        filterSearch: true,
        onFilter: (value, record) => record.phone.includes(value),
        render: (text) => <span>{text}</span>,
      }, {
        title: 'Authorization',
        dataIndex: 'authorization',
        key: 'authorization',
        width: '10%',
        filterSearch: true,
        filtered: true,
        onFilter: (value, record) => record.authorization.includes(value),
        render: (text) => <span>{text}</span>,
      }, {
        title: 'Website',
        dataIndex: 'website',
        key: 'website',
        width: '15%',
        filterSearch: true,
        filtered: true,
        onFilter: (value, record) => record.website.includes(value),
        render: (text) => <a>{text}</a>,
      }, {
        width: '5%',
        render: (_, data) => <Tooltip placement="top" title='Delete'>
                <Popconfirm placement="top" title='Are you sure to delete this User?' onConfirm={() => deleteUserAction(data)} okText="Yes" cancelText="No">
                  <DeleteOutlined/>
                </Popconfirm>
            </Tooltip>
      }
    ]

    return (
        <div>
            <Space direction='vertical' className="user-list">
                <Row justify="space-between">
                  <Title level={3}>Users</Title>
                  <Button type="primary" onClick={() => setOpen(true)}>
                    <PlusOutlined /> ADD New User
                  </Button>
                </Row>
                <Table columns={columns} dataSource={data} pagination={{pageSize: 9}}/>
            </Space>

            <Modal open={open}
                  width="max-content"
                  title="Create a new User"
                  onCancel={() => setOpen(false)}
                  footer={null}
            >
              <UserForm usage="add" closeModal={() => setOpen(false)}/>
            </Modal>

        </div>
    )
}

export default UserList;