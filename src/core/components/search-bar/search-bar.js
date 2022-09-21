import { Input, Popover, List, Typography, Space, Empty, Row, Button } from "antd";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { searchUser } from '../../../main/store/users/user-slice';
import { searchPostAction, toggleSearch } from '../../../main/store/posts/post-slice';
import './search-bar.scss';
import _ from 'lodash';
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const { Text } = Typography;

function SearchBar() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const listUsers = useSelector(state => state.user.userSearch);
    const listPost = useSelector(state => state.posts.searchPost);
    const navigate = useNavigate()

    const dispatch = useDispatch();

    const content = (
        <Space direction="vertical" onMouseLeave={() => setOpen(false)}>

            {listUsers.length > 0 ?  
            <Space direction="vertical" style={{width: '100%'}}>
                <Text strong>Users</Text>
                <List
                dataSource={_.take(listUsers, 5)}
                renderItem= { item => (
                    <List.Item key={item.id}>
                         {item.name}
                    </List.Item>
                )}>

                </List>
            </Space>           
             : null} 

            {listPost.length > 0 ?
            <Space direction="vertical" style={{width: '100%'}}>
                <Text strong>Posts</Text>
                <List
                dataSource={_.take(listPost, 5)}
                renderItem= { item => (
                    <List.Item key={item.id}>
                         {item.title}
                    </List.Item>
                )}>
                </List>
            </Space> : null}

            {listPost.length === 0 && listUsers.length === 0 ? 
                <Empty /> : null
            }

            {listPost.length > 0 || listUsers.length > 0 ? <div style={{display: 'flex'}}>
                { listUsers.length > 0 ? <Button block style={{minWidth: '150px'}} onClick={() => navigate('/search')}>See All Users</Button> : null}
                { listPost.length > 0 ? <Button block style={{minWidth: '150px'}} onClick={() => dispatch(toggleSearch(true))}>See All Posts</Button> : null }
            </div>  : null}
        </Space>
    )

    function searchGlobal(value) {
        setSearch(value);
        dispatch(searchUser(value));
        dispatch(searchPostAction(value));
        setOpen(!_.isEmpty(_.trim(value)));
    }

    return (
        <div>
            <Popover placement="topLeft" content={content} open={open} >
            </Popover>
            <Search className="search-input" placeholder="Search..." onChange={(e) => searchGlobal(e.target.value)} 
                onFocus={() => setOpen(!_.isEmpty(_.trim(search)))} value={search}/>

        </div>
    );
}

export default SearchBar;