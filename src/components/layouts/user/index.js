import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BookOutlined,
  UserOutlined,
  AuditOutlined,
  DollarOutlined,
  HomeOutlined,
  AreaChartOutlined,
  DownOutlined
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, theme } from 'antd';
import { useNavigate,useLocation } from 'react-router-dom';
import { useLogoutMutation } from '../../../services/authApis';
const { Header, Sider, Content } = Layout;


const menuItem=[
    {
      key: '/tong_quan',
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
  const [logOut, { isLoading }] = useLogoutMutation();
  const onClickLogout = async() =>{
    await logOut().unwrap();
    localStorage.removeItem('accessToken');
    navigate('/login')
  }
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => onClickLogout()}>
        Đăng xuất
      </Menu.Item>
      {/* <Menu.Item key="2" onClick={() => console.log('Settings clicked')}>
        Settings
      </Menu.Item>
      <Menu.Item key="3" onClick={() => console.log('Logout clicked')}>
        Logout
      </Menu.Item> */}
    </Menu>
  );

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
          <div style={{float:"right",marginRight:"50px"}}>
            <Dropdown overlay={menu} trigger={['click']}>
              <Avatar style={{ cursor: 'pointer' }} icon={<UserOutlined />} >
                <DownOutlined style={{ marginLeft: 8 }} />
              </Avatar> 
            </Dropdown>
          </div>
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