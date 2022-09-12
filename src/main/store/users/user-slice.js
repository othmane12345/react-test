import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Users} from '../../../shared/data/users';
import _ from 'lodash';

const userSlice = createSlice ({
    name: 'user',
    initialState: {
        users: [],
        currentUser: null,
        userAuthorozation: '',
        userId: 0
    },
    reducers: {
        fetchUsers: (state, action) => {
            state.users = action.payload;
        },
        connect: (state, action) => {
            const {password, userName, email} = action.payload;
            const findUser = _.find(state.users, user => user.password === password && (user.userName === userName || user.email === email));
            if (findUser) {
                state.currentUser = findUser;
                state.userAuthorozation = findUser.authorization;
                state.userId = findUser.id;
            }
        },
        disconnect: (state) => {
            state.currentUser = null;
            state.userAuthorozation = '';
            state.userId = 0;
        }
    }
})

export const fetchUsersAction = () => (dispatch) => {
    dispatch(fetchUsers(Users));
}

export const { fetchUsers, connect, disconnect } = userSlice.actions;

export default userSlice.reducer
