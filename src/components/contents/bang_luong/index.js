import React, { useEffect, useState ,useCallback } from 'react';
import { Space,Button,Popconfirm,Form,Col,Row,Input,Select,Table, DatePicker, TimePicker, message } from 'antd';
import { debounce } from 'lodash';
import dayjs from 'dayjs';
import {
  SearchOutlined
} from '@ant-design/icons';
import DrawerComponent from '../../drawer';
import FormCreateBangLuong from './form_create';
import { useGetAllBangLuongChoNhanVienQuery, useSearchBangLuongQuery } from '../../../services/bangLuongApis';




const { Option } = Select;


const BangLuongContent = () => {
    const [form] = Form.useForm();
    const { data:allBangLuong, error:allBangLuongEror, isLoading:allBangLuongIsLoading } = useGetAllBangLuongChoNhanVienQuery(undefined, {
        refetchOnMountOrArgChange: true,
      });
    const [searchTerm, setSearchTerm] = useState('');

    const { data:searchBangLuong, error:searchBangLuongEror, isLoading:searchBangLuongIsLoading } = useSearchBangLuongQuery(
      searchTerm ? { ten_nhan_su: searchTerm.ten_nhan_su, ma_nhan_su: searchTerm.ma_nhan_su} : {},
      { skip: !searchTerm }
    );
    const bangLuongs = searchTerm ? searchBangLuong : allBangLuong;

    const onSearchBangLuong = async(values) => {
      setSearchTerm(values);
    };
  
    const handleClickResetFormSearch = () =>{
      form.resetFields();
      setSearchTerm({});
    }
    const columns = [
        {
          title: 'Mã số nhân viên',
          dataIndex: 'ma_nhan_su',
          key: 'ma_nhan_su',
        },
        {
          title: 'Tên nhân viên',
          dataIndex: 'ten_nhan_su',
          key: 'ten_nhan_su',
        },
        {
          title: 'Lương cơ bản',
          dataIndex: 'tien_luong',
          key: 'tien_luong',
        },
        {
          title: 'Phụ cấp',
          dataIndex: 'phu_cap',
          key: 'phu_cap',
        },
        {
            title: 'Khấu trừ',
            dataIndex: 'khau_tru',
            key: 'khau_tru',
            render: (text) => <p style={{color:"red"}}>{text} </p>
        },   
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <DrawerComponent  textButton={"Cập nhật"} content={<FormCreateBangLuong formValue={record}/>}  title={"Thông tin bảng lương của nhân viên"}/>
              {/* <Popconfirm
                title="Xóa phòng ban"
                description="Bạn có chắc chắn muốn xóa phòng ban này"
                okText="Có"
                cancelText="Không"
                onConfirm={() =>handleClickRemovePhongBan(record._id)}
              >
                <Button danger>Xóa</Button>
              </Popconfirm> */}
            </Space>
          ),
        },
      ];


  return (
   <div className='container'>
        <div style={{marginBottom:"40px"}}>
          <h1>Quản lý bảng lương <div style={{float:"right"}}> <DrawerComponent  textButton={"Thêm mới"} content={<FormCreateBangLuong/>} title={"Thông tin bảng lương"}/></div></h1>
          <div className='search_phong_ban'>
          <Form 
            form={form}
            layout="vertical"
            onFinish={onSearchBangLuong}
          >
            <Row gutter={16}>
                <Col span={6}>
                <Form.Item
                    name="ma_nhan_su"
                >
                    <Input placeholder="Mã nhân viên"/>
                </Form.Item>
                </Col>
                <Col span={6}>
                <Form.Item
                    name="ten_nhan_su"

                >
                    <Input placeholder="Tên nhân viên"/>
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
                  Làm mới 
                </Button>
              </Form.Item>
            </Col>
            
          </Row>
          </Form>  
          </div>
        </div>
    <Table columns={columns} dataSource={bangLuongs} />
  </div>
  );

}

export default BangLuongContent;