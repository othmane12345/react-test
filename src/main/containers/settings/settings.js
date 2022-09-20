import './settings.scss';

import Navbar from "../../../core/containers/navbar/navbar";
import { Tabs } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import UserForm from '../../components/user-form/user-form';
import UserList from '../../components/user-list/user-list';

function Settings() {
    return (
        <div>
            <Navbar/>
            <div className="settings-body">
            <Tabs
             tabPosition='left'
             size="small"
             items={[
                {
                    label: (<span>
                        <LockOutlined />
                        Privacy
                        </span>),
                    key: 0,
                    children: (<div><UserForm/></div>)
                },
                {
                    label: (<span>
                        <UserOutlined />
                        Users
                        </span>),
                    key: 1,
                    children: (<div><UserList/></div>)
                }
             ]}
            />
            </div>
        </div>
    );
}

export default Settings;