import "./navbar.scss";
import { useSelector, useDispatch } from 'react-redux';
import { Space, Avatar, Divider, Dropdown, Menu } from "antd";
import { useState } from "react";
import { UserOutlined, PoweroffOutlined, SettingOutlined } from '@ant-design/icons';
import SearchBar from "../../components/search-bar/search-bar";
import { useNavigate } from 'react-router-dom';
import { disconnect } from "../../../main/store/users/user-slice";

function Navbar() {
    const [open, setOpen] = useState(false);
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function disconnectUser() {
        dispatch(disconnect());
    }

    const handleOpenChange = (flag) => {
        setOpen(flag);
    };

    function redirectHome() {
        navigate('/Home');
    }

    const onClick = (e) => {
        switch(e.key) {
            case 'disconnect': 
                disconnectUser();
                navigate('/');
                break;
            case 'settings':
                navigate('/Settings');
                break;
        }
    };

    const menu = (
        <Menu
          onClick={onClick}
          items={[
            {
                key: 'settings',
                label: (<span>Settings</span>),
                icon: (<SettingOutlined />)
            },
            {
                type: 'divider'
            },
            {
              key: 'disconnect',
              label: (<span>Disconnect</span>),
              icon: (<PoweroffOutlined />)
            },
          ]}
        />
    );

    return (
        <div className="navbar-wrap">
            <div className="navbar-main">
                <span>
                    <Space>
                        <img onClick={() => redirectHome()} src="/x-hub2.jpg"/>
                        <SearchBar />
                    </Space>
                </span>
                <span>
                    <Space>
                        <Divider type="vertical" />
                        <Dropdown overlay={menu} onOpenChange={handleOpenChange} open={open}>
                            <Space className="hover-menu">
                                <Avatar style={{ backgroundColor: '#d67b3d', verticalAlign: 'middle' }} size="large" gap={4} icon={<UserOutlined />}>
                                </Avatar>
                                {currentUser.name}
                            </Space>
                        </Dropdown>

                    </Space>
                </span>
            </div>
        </div>
    );
}

export default Navbar;