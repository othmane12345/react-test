import './App.less';
import {Route, Routes, Navigate} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './main/containers/login/login';
import Dashboard from './main/containers/dashboard/dashboard';
import Settings from "./main/containers/settings/settings";
import NotFound from './main/containers/not-found/not-found';
import { fetchUsersAction } from './main/store/users/user-slice';
import SearchUser from './main/containers/search/search-user-result';

const ProtectedRoute = ({ authorization, redirectPath = '/' , children}) => {
  console.log(authorization)
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
  }, []);

  return (
  <Routes>
    <Route index path="/" element={<Login />}/>
    <Route path='/Home' element={
      <ProtectedRoute authorization={authorization}>
        <Dashboard/>
      </ProtectedRoute>
    }/>
    <Route path='/Settings' exact element={
      <ProtectedRoute authorization={authorization}>
       <Settings/>
      </ProtectedRoute>
    }/>
    <Route path="/search" element={
    <ProtectedRoute authorization={authorization}>
      <SearchUser/>
    </ProtectedRoute> } 
    />
    <Route path="/notFound" element={<NotFound />}/>
    <Route path='*' element={<Navigate to="/notFound" replace />} />
  </Routes>
  );
}

export default App;
