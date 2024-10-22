import React from 'react';
import 'antd/es/style/reset.css'; 
import LoginForm from '../../components/login_form';


const Login = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <LoginForm />
    </div>
  );
};

export default Login;