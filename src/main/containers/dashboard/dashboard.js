import "./dashboard.scss"

import { useEffect, useState } from 'react'
import Navbar from "../../../core/containers/navbar/navbar"
import PostCards from "../../components/posts/post-cards"
import { useSelector, useDispatch } from 'react-redux'
import { Space } from "antd"
import _ from  "lodash"
import { fetchPostsAction } from "../../store/posts/post-slice"

function Dashboard() {
    const posts = useSelector(state => state.post.content);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPostsAction());
    }, []);

    return (
        <div>
            <Navbar />
            <div className="dashboard-body">
                <Space className="cards-holder" direction="vertical" >
                    {_.map(posts, post => <PostCards className="card" key={post.id} post={post} />)}
                </Space>
            </div>
        </div>
    );
}

export default Dashboard;