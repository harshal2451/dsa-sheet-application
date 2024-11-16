import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import Login from './components/Login';
import DSAHome from './components/DSAHome';
import PrivateRoute from './components/PrivateRoute';
import './App.css';


function App() {
  
  return (
    <Router>
      <Layout>
        {/* <Header>
          <div className="logo">DSA</div>
        </Header> */}
        {/* <Content> */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><DSAHome /></PrivateRoute>} />
          </Routes>
        {/* </Content> */}
      </Layout>
    </Router>
  );
}

export default App;
