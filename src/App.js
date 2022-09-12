import './App.css';
import {Route, Routes, Navigate} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './main/containers/login/login';
import Dashboard from './main/containers/dashboard/dashboard';
import Settings from "./main/containers/settings/settings";
import { fetchUsersAction } from './main/store/users/user-slice';

const ProtectedRoute = ({ authorization, redirectPath = '/' , children}) => {
  if (authorization !== 'User' && authorization !== 'Admin') {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

function App() {
  const authorization = useSelector(state => state.user.userAuthorization);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, );

  return (
  <Routes>
    <Route index path="/" exact element={<Login />}/>
    <Route path='/Home' exact element={
      <ProtectedRoute authorization={authorization}>
        <Dashboard/>
      </ProtectedRoute>
    }/>
    <Route path='/Settings' exact element={
      <ProtectedRoute authorization={authorization}>
       <Settings/>
      </ProtectedRoute>
    }/>
    <Route path='*' element={<Navigate to="/" replace />} />
  </Routes>
  );
}

export default App;
