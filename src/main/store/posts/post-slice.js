import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { Posts } from '../../../shared/data/posts';

const postSlice = createSlice ({
    name: 'posts',
    initialState: {
        content: [],
        allPosts: [],
        searchResult: [],
        pagination: {
            currentPage: 0,
            numberOfLoadedItems: 0,
            total: 0
        },
    },
    reducers: {
        initAllPosts: (state) => {
            if (state.allPosts.length === 0)
             state.allPosts = Posts;
        },
        fetchPosts: (state, action) => {
            state.content = action.payload;
            state.pagination.currentPage = state.pagination.currentPage + 1;
            state.pagination.numberOfLoadedItems = state.pagination.numberOfLoadedItems + 10;
        },
        addPost: (state, action) => {
            state.allPosts = [action.payload, ...state.allPosts];
            state.content = [action.payload, ...state.content];
        },
        deletePost: (state, action) => {
            state.allPosts = _.filter(state.allPosts, post => post.userId !== action.payload);
            state.content = _.filter(state.content, post => post.userId !== action.payload);
        },
        searchPosts: (state, action) => {

        }
    }
})

export const fetchPostsAction = () => (dispatch, getState) => {
    const state = getState();
    var posts = state.posts.allPosts;
    const {users, currentUser, userAuthorization} = state.user;
    posts = userAuthorization === 'User' ? _.filter(posts, post => post.userId === currentUser.id) : posts;
    posts = _.map(posts, post => ({...post, userName: _.get(_.find(users, user => user.id === post.userId), 'name') }))
    dispatch(fetchPosts(posts));
}

export const addNewPost = (payload) => (dispatch, getState) => {
    const state = getState();
    var userId = _.get(payload, 'userId', state.user.userId);
    var postId = _.max(_.map(state.posts.allPosts, item => item.id)) + 1;
    dispatch(addPost({...payload, userId: _.get(payload, 'id', userId), postId}));
    dispatch(fetchPostsAction());
}

export const { initAllPosts, fetchPosts, addPost, deletePost, searchPosts } = postSlice.actions;

export default postSlice.reducer
