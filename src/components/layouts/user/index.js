import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BookOutlined,
  UserOutlined,
  AuditOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate,useLocation } from 'react-router-dom';
const { Header, Sider, Content } = Layout;


const menuItem=[
    {
      key: '/nhan_vien',
      icon: <UserOutlined />,
      label: 'Quản lý nhân sự',
    },
    {
      key: '/phong_ban',
      icon: <AuditOutlined />,
      label: 'Quản lý phòng ban',
    },
    {
      key: '/cham_cong',
      icon: <BookOutlined />,
      label: 'Quản lý chấm công',
    },
    {
      key: '/bang_luong',
      icon: <DollarOutlined />,
      label: 'Quản lý bảng lương',
    },
  ]
const LayoutUser = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { content } = props
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItem}
          onClick={({ key }) => {
            navigate(key)
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
        <div className='content'>{content}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutUser;