import "./dashboard.scss"

import { useEffect, useState } from 'react'
import Navbar from "../../../core/containers/navbar/navbar"
import PostCards from "../../components/posts/post-cards"
import { useSelector, useDispatch } from 'react-redux'
import { Space, Typography, Row, Tooltip } from "antd"
import { CloseCircleOutlined } from '@ant-design/icons';
import _ from  "lodash"
import { fetchPostsAction, toggleSearch } from "../../store/posts/post-slice"
import NewPost from "../../components/new-post/new-post"

const { Title } = Typography

function Dashboard() {
    const posts = useSelector(state => state.posts.content);
    const searchPosts = useSelector(state => state.posts.searchPost);
    const activeSearch = useSelector(state => state.posts.searchActive);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPostsAction());
    }, []);

    return (
        <div>
            <Navbar />
            <div className="dashboard-body">
                <Space className="cards-holder" direction="vertical" >
                    {activeSearch ? <Row justify="space-between">
                        <Title level={3}>Search Result</Title> 
                        <Tooltip placement="left" title='Return To Main Page'>
                            <CloseCircleOutlined onClick={() => dispatch(toggleSearch(false))} style={{fontSize: '29px'}} />
                        </Tooltip>
                    </Row>: null}
                    {activeSearch ? null : <NewPost/>}
                    {_.map(activeSearch ? searchPosts : posts, post => <PostCards className="card" key={post.id} post={ post} />)}
                </Space>
            </div>
        </div>
    );
}

export default Dashboard;