import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Users } from '../../../shared/data/users';
import _ from 'lodash';

const userSlice = createSlice ({
    name: 'user',
    initialState: {
        users: [],
        userSearch: [],
        currentUser: null,
        userAuthorization: '',
        userId: 0
    },
    reducers: {
        fetchUsers: (state, action) => {
            state.users = action.payload;
        },
        connect: (state, action) => {
            const {findUser} = action.payload;
            state.currentUser = findUser;
            state.userAuthorization = findUser.authorization;
            state.userId = findUser.id;      
        },
        disconnect: (state) => {
            state.currentUser = null;
            state.userAuthorization = '';
            state.userId = 0;
        },
        addNewUser: (state, action) => {
            state.users = [...state.users, action.payload]
        },
        deleteUser: (state, action) => {
            state.users = _.filter(state.users, item => item.id !== action.payload);
        },
        updateUser: (state, action) => {
            const {updatedUser} = action.payload;
            state.currentUser = updatedUser;
            state.users = _.map(state.users, user => user.id === updatedUser.id ? updatedUser : user);
        },
        searchUser: (state, action) => {
            state.userSearch = _.filter(state.users, item => _.includes(item.name, action.payload))
        }
    }
})

export const fetchUsersAction = () => (dispatch) => {
    dispatch(fetchUsers(Users));
}

export const connectUser = (payload) => (dispatch, getState) => {
    const state = getState();
    const {password, userName} = payload;
    const findUser = _.find(state.user.users, user => user.password === password && (user.username === userName || user.email === userName));
    if (findUser) {
        dispatch(connect({findUser}));
    } else {
        dispatch(disconnect());
    }
}

export const addNewUserAction = (payload) => (dispatch, getState) => {
    const state = getState();
    const id = _.max(_.map(state.user.users, user => _.toInteger(user.id))) + 1;
    dispatch(addNewUser({id, ...payload}));
}

export const { fetchUsers, connect, disconnect, addNewUser, updateUser, deleteUser, searchUser } = userSlice.actions;

export default userSlice.reducer
