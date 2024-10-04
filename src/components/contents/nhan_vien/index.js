import React, { useEffect, useState } from 'react';
import { Space,Button,Popconfirm,Form,Col,Row,Input,Select,Table } from 'antd';
import { useGetAllNhanVienQuery, useRemoveNhanVienMutation,useSearchNhanVienQuery } from '../../../services/nhanviensApi';
import DrawerComponent from '../../drawer';
import FormCreateNhanVien from './form_create';
import {
  SearchOutlined
} from '@ant-design/icons';

const { Option } = Select;


const NhanVienContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm();
  const { data:allNhanVien, error:allNhanVienEror, isLoading:allNhanVienIsLoading } = useGetAllNhanVienQuery();
  const { data:searchNhanVien, error:searchNhanVienEror, isLoading:searchNhanVienIsLoading } = useSearchNhanVienQuery(
    searchTerm ? { ten_nhan_su: searchTerm.ten_nhan_su, so_dien_thoai: searchTerm.so_dien_thoai, gioi_tinh: searchTerm.gioi_tinh, noi_sinh: searchTerm.noi_sinh, nguyen_quan: searchTerm.nguyen_quan, dia_chi_hien_tai:searchTerm.dia_chi_hien_tai } : {}, // Nếu có từ khóa, gọi API tìm kiếm
    { skip: !searchTerm }
  );
  const nhanViens = searchTerm ? searchNhanVien : allNhanVien;
  const onSearchNhanVien = async(values) => {
    setSearchTerm(values);
  };
  const handleClickResetFormSearch = () =>{
    form.resetFields();
    setSearchTerm({});
  }
  const [removeNhanVien] =useRemoveNhanVienMutation();
  const handleClickRemoveNhanVien = (id) =>{
    removeNhanVien(id);
  }

 

  const columns = [
    {
      title: 'Tên nhân sự',
      dataIndex: 'ten_nhan_su',
      key: 'ten_nhan_su',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gioi_tinh',
      key: 'gioi_tinh',
      render: (text) => text=="male"?<p>Nam</p>:<p>Nữ</p>,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'nam_sinh',
      key: 'nam_sinh',
      render: (text) => <p>{new Date(text).toLocaleDateString()}</p>,
    },
    {
      title: 'Nơi sinh',
      dataIndex: 'noi_sinh',
      key: 'noi_sinh',
    },
    {
      title: 'Nguyên quán',
      dataIndex: 'nguyen_quan',
      key: 'nguyen_quan',
    },
    {
      title: 'Địa chỉ hiện tại',
      dataIndex: 'dia_chi_hien_tai',
      key: 'dia_chi_hien_tai',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'so_dien_thoai',
      key: 'so_dien_thoai',
    },
    {
      title: 'Dân tộc',
      dataIndex: 'dan_toc',
      key: 'dan_toc',
    },
    {
      title: 'Tôn giáo',
      dataIndex: 'ton_giao',
      key: 'ton_giao',
    },
    {
      title: 'Trình độ văn hóa',
      dataIndex: 'trinh_do_van_hoa',
      key: 'trinh_do_van_hoa',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <DrawerComponent textButton={"Cập nhật"} content={<FormCreateNhanVien formValue={record}/>}/>
          <Popconfirm
            title="Xóa nhân viên"
            description="Bạn có chắc chắn muốn xóa nhân sự này"
            okText="Có"
            cancelText="Không"
            onConfirm={() =>handleClickRemoveNhanVien(record._id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  return (
    <div className='container'>
        <div style={{marginBottom:"40px"}}>
          <h1>Quản lý nhân sự <div style={{float:"right"}}> <DrawerComponent  textButton={"Thêm mới"} content={<FormCreateNhanVien/>} title={"Thông tin nhân sự"}/></div></h1>
          <div className='search_nhan_vien'>
          <Form 
            form={form}
            layout="vertical"
            onFinish={onSearchNhanVien}
          >

          <Row gutter={16}>
            <Col span={4}>
              <Form.Item
                  name="ten_nhan_su"
                >
                    <Input placeholder="Tên nhân sự"/>
                </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="so_dien_thoai"

              >
                <Input placeholder="Số điện thoại"/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="gioi_tinh"
              >
                <Select placeholder="Giới tính">
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
                </Select>  
              </Form.Item>
            </Col>          
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                  name="noi_sinh"
                >
                    <Input placeholder="Nơi sinh"/>
                </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="nguyen_quan"

              >
                <Input placeholder="Nguyên quán"/>
              </Form.Item>
            </Col>
            <Col span={6}>
            <Form.Item
              name="dia_chi_hien_tai"
            >
              <Input placeholder='Địa chỉ hiện tại'/>
            </Form.Item>
            </Col>          
          </Row> 
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item wrapperCol={{ span: 16 }}>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                  Tìm kiếm
                </Button>
                <Button style={{marginLeft:"20px"}} onClick={handleClickResetFormSearch} >
                  Clear 
                </Button>
              </Form.Item>
            </Col>
            
          </Row>
          </Form>  
          </div>
        </div>
        <Table columns={columns} dataSource={nhanViens} rowKey="_id"/>
    </div>
  );

}

export default NhanVienContent;