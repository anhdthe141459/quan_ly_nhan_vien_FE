import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useLoginMutation } from '../../services/authApis';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
  const onFinish = async(values) => {
    try {
        const response = await login(values).unwrap();
        localStorage.setItem('accessToken', response.accessToken);
        navigate('/tong_quan');
      } catch (error) {
        message.error("Sai tên tài khoản hoặc mật khẩu");
      }
  
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='container' style={{width:"100%",display:"flex", justifyContent:"center",}}>
      <div style={{ border: '1px solid brown',  padding: '2px', borderRadius: '1px', height:"60vh",width:"25%"}}>
        <div style={{display:"flex", justifyContent:"center", marginTop:"50px", marginBottom:"50px"}}>
            <h1>
              Đăng nhập
            </h1>
        </div>
        <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: '90%' }}
      >
        <Form.Item
          label="Username"
          name="userName"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default LoginForm;
