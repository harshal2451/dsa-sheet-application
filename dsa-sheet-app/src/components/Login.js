import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";
let apiUrl = process.env.REACT_APP_API_URL;
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/v1/user/login`, values);
      localStorage.setItem('token', response.data.data);
      message.success('Logged in successfully');
      navigate('/');
    } catch (err) {
      message.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      
      <Form onFinish={handleSubmit} className="login-form">
        <h1 style={{textAlign: "center"}}>DSA Sheet</h1>
        <h2>Login</h2>
        <Form.Item name="username" rules={[{ required: true, message: 'Username is required' }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Password is required' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
