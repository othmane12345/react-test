import "./navbar.scss";
import { useSelector, useDispatch } from 'react-redux';
import { Space, Avatar, Divider } from "antd";
import { UserOutlined } from '@ant-design/icons';
import SearchBar from "../../components/search-bar/search-bar";

function Navbar() {
    const currentUser = useSelector(state => state.user.currentUser);

    return (
        <div className="navbar-wrap">
            <div className="navbar-main">
                <span>
                    <img src="/x-hub2.jpg"/>
                </span>
                <span>
                    <Space>
                        <SearchBar />
                        <Divider type="vertical" />
                        <Avatar style={{ backgroundColor: '#d67b3d', verticalAlign: 'middle' }} size="large" gap={4} icon={<UserOutlined />}>
                        </Avatar>
                       {currentUser.name}
                    </Space>
                </span>
            </div>
        </div>
    );
}

export default Navbar;