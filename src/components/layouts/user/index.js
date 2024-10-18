import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BookOutlined,
  UserOutlined,
  AuditOutlined,
  DollarOutlined,
  HomeOutlined,
  AreaChartOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate,useLocation } from 'react-router-dom';
const { Header, Sider, Content } = Layout;


const menuItem=[
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Tổng quan',
    },
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
    {
      key: '/thong_ke',
      icon: <AreaChartOutlined />,
      label: 'Thống kê',
      children: [
        { key: '/thong_ke/cham_cong_nhan_vien', label: 'Bảng chấm công theo tháng' },
        { key: '/thong_ke/luong_nhan_vien', label: 'Lương nhân viên' },
      ],
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
          defaultOpenKeys={['/thong_ke']}
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