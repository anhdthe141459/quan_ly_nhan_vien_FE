import React, { useEffect, useState } from 'react';
import { Space,Button,Popconfirm,Form,Col,Row,Input,Select,Table, DatePicker } from 'antd';
import { useGetAllNhanVienNotPhongBanQuery, useGetAllPhongBanQuery, useRemovePhongBanMutation } from '../../../services/phongBanApis';
import DrawerComponent from '../../drawer';
import FormCreatePhongBan from './form_create';

import {
  SearchOutlined
} from '@ant-design/icons';



const { Option } = Select;


const PhongBanContent = () => {
  const { data:allPhongBan, error:allPhongBanEror, isLoading:allPhongBanIsLoading} = useGetAllPhongBanQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [selectedPhongBanId, setSelectedPhongBanId] = useState(null);
  const { data:allNhanVienNotTruongPhong, error:allNhanVienNotTruongPhongError, isLoading:allNhanVienNotTruongPhongIsLoading } = useGetAllNhanVienNotPhongBanQuery(selectedPhongBanId,{
    refetchOnMountOrArgChange: true,
  });
    const [removePhongBan] =useRemovePhongBanMutation();
    const handleClickRemovePhongBan = (id) =>{
        removePhongBan(id);
    }
    const [searchTerm, setSearchTerm] = useState('');
    const [form] = Form.useForm();

  const onClickButtonDrawerPhongBan = (phongBanId) =>{
    setSelectedPhongBanId(phongBanId);
  }
  const columns = [
    {
      title: 'Tên phòng ban',
      dataIndex: 'ten_phong_ban',
      key: 'ten_phong_ban',
    },
    {
      title: 'Số lượng nhân viên',
      dataIndex: 'so_luong_nhan_vien',
      key: 'so_luong_nhan_vien',
    },
    {
      title: 'Ngày thành lập',
      dataIndex: 'ngay_thanh_lap',
      key: 'ngay_thanh_lap',
      render: (text) => <p>{new Date(text).toLocaleDateString()}</p>,
    },
    {
      title: 'Trưởng phòng',
      dataIndex: 'ten_truong_phong',
      key: 'ten_truong_phong',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <DrawerComponent onClickButtonDrawer={() => onClickButtonDrawerPhongBan(record._id)} textButton={"Cập nhật"} content={<FormCreatePhongBan formValue={record}/>}  title={"Thông tin phòng ban"}/>
          <Popconfirm
            title="Xóa phòng ban"
            description="Bạn có chắc chắn muốn xóa phòng ban này"
            okText="Có"
            cancelText="Không"
            onConfirm={() =>handleClickRemovePhongBan(record._id)}
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
          <h1>Quản lý phòng ban <div style={{float:"right"}}> <DrawerComponent  textButton={"Thêm mới"} content={<FormCreatePhongBan/>} title={"Thông tin phòng ban"}/></div></h1>
          <div className='search_phong_ban'>
          <Form 
            form={form}
            layout="vertical"
            // onFinish={onSearchNhanVien}
          >
            <Row gutter={16}>
                <Col span={6}>
                <Form.Item
                    name="ten_phong_ban"
                    >
                        <Input placeholder="Tên phòng ban"/>
                    </Form.Item>
                </Col>
                <Col span={6}>
                <Form.Item
                    name="ngay_thanh_lap"

                >
                    <DatePicker placeholder='Ngày thành lập' style={{width:"100%"}}/>
                </Form.Item>
                </Col>
                <Col span={6}>
                <Form.Item
                    name="ten_truong_phong"
                    >
                        <Input placeholder="Tên trưởng phòng"/>
                    </Form.Item>
                </Col>    
            </Row>
            <Row gutter={16}>
            <Col span={12}>
              <Form.Item wrapperCol={{ span: 16 }}>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                  Tìm kiếm
                </Button>
                <Button style={{marginLeft:"20px"}} onClick={{}} >
                  Clear 
                </Button>
              </Form.Item>
            </Col>
            
          </Row>
          </Form>  
          </div>
        </div>
        <Table columns={columns} dataSource={allPhongBan} rowKey="_id"/>
  </div>
  );

}

export default PhongBanContent;