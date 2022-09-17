import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { Posts } from '../../../shared/data/posts';

const postSlice = createSlice ({
    name: 'posts',
    initialState: {
        content: [],
        pagination: {
            currentPage: 0,
            numberOfLoadedItems: 0,
            total: 0
        },
    },
    reducers: {
        fetchPosts: (state, action) => {
            state.content = action.payload;
            state.pagination.currentPage = state.pagination.currentPage + 1;
            state.pagination.numberOfLoadedItems = state.pagination.numberOfLoadedItems + 10;
        },
        addPost: (state, action) => {

        },
        deletePost: (state, action) => {

        }
    }
})

export const fetchPostsAction = () => (dispatch, getState) => {
    const state = getState();
    const {users, currentUser, userAuthorization} = state.user;
    var posts = userAuthorization === 'User' ? _.filter(Posts, post => post.userId === currentUser.id) : Posts;
    posts = _.map(posts, post => ({...post, userName: _.get(_.find(users, user => user.id === post.userId), 'name') }))
    dispatch(fetchPosts(posts));
}

export const { fetchPosts, addPost, deletePost } = postSlice.actions;

export default postSlice.reducer
