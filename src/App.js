import './App.css';
import {Route, Routes, Navigate} from "react-router-dom";
import { useState } from 'react';
import Login from './main/containers/login/login';
import Dashboard from './main/containers/dashboard/dashboard';
import Settings from "./main/containers/settings/settings";

const ProtectedRoute = ({ authorization, redirectPath = '/' , children}) => {
  console.log(authorization)
  if (authorization !== 'User' && authorization !== 'Admin') {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

function App() {
  const [authorization, setAuthorization] = useState('');

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
