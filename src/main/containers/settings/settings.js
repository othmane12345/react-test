import './settings.scss';

import Navbar from "../../../core/containers/navbar/navbar";
import { Tabs } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import UserForm from '../../components/user-form/user-form';
import UserList from '../../components/user-list/user-list';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import _ from 'lodash';

function Settings() {
    const userAuthorization = useSelector(state => state.user.userAuthorization);
    const [listItems, setListItems] = useState([
        {
        label: (<span>
            <LockOutlined />
            Privacy
            </span>),
        key: 0,
        user: 'all',
        children: (<div><UserForm/></div>)
        },
        {
        label: (<span>
            <UserOutlined />
            Users
            </span>),
        key: 1,
        user: 'adminOnly',
        children: (<div><UserList/></div>)
        }
    ]);

    return (
        <div>
            <Navbar/>
            <div className="settings-body">
                <Tabs
                 tabPosition='left'
                 size="small"
                 items={userAuthorization === 'Admin' ? listItems : _.filter(listItems, item => item.user === 'all')}
                />
            </div>
        </div>
    );
}

export default Settings;