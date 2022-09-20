import { Typography, Space, Table, Tooltip, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import './user-list.scss';
import { deleteUser } from '../../store/users/user-slice';

const { Text, Title } = Typography;

function UserList() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.user.users);

    const deleteUserAction = (data) => {

    }

    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filterSearch: true,
        onFilter: (value, record) => record.name.includes(value),
        render: (text) => <span>{text}</span>,
      }, {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        filterSearch: true,
        onFilter: (value, record) => record.userName.includes(value),
        render: (text) => <span>{text}</span>,
      }, {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        filterSearch: true,
        onFilter: (value, record) => record.email.includes(value),
        render: (text) => <a>{text}</a>,
      }, {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        filterSearch: true,
        onFilter: (value, record) => record.phone.includes(value),
        render: (text) => <span>{text}</span>,
      }, {
        title: 'Authorization',
        dataIndex: 'authorization',
        key: 'authorization',
        filterSearch: true,
        filtered: true,
        onFilter: (value, record) => record.authorization.includes(value),
        render: (text) => <span>{text}</span>,
      }, {
        render: (_, data) => <Tooltip placement="top" title='Delete'>
                <Popconfirm placement="top" title='Are you sure to delete this User?' onConfirm={() => deleteUserAction(data)} okText="Yes" cancelText="No">
                    <DeleteOutlined/>
                </Popconfirm>
            </Tooltip>
      }
    ]

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

    return (
        <div>
            <Space direction='vertical'>
                <Title level={3}>Users</Title>
                <Table columns={columns} dataSource={data} onChange={onChange} pagination={{pageSize: 9}}/>
            </Space>

        </div>
    )
}

export default UserList;