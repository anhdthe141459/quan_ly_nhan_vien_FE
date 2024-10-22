import React, { useEffect, useState ,useCallback } from 'react';
import { Space,Button,Popconfirm,Form,Col,Row,Input,Select,Table, DatePicker, TimePicker, message } from 'antd';
import { debounce } from 'lodash';
import dayjs from 'dayjs';
import {
  SearchOutlined
} from '@ant-design/icons';
import DrawerComponent from '../../drawer';
import FormCreateBangLuong from './form_create';
import { useGetAllBangLuongChoNhanVienQuery, useLazyDownloadExcelBangLuongQuery, useSearchBangLuongQuery } from '../../../services/bangLuongApis';




const { Option } = Select;


const BangLuongContent = () => {
    const [form] = Form.useForm();
    const { data:allBangLuong, error:allBangLuongEror, isLoading:allBangLuongIsLoading } = useGetAllBangLuongChoNhanVienQuery(undefined, {
        refetchOnMountOrArgChange: true,
      });
    const [triggerDownload,{ data:downloadExcelBangLuong }] = useLazyDownloadExcelBangLuongQuery();
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

    const handleClickDownloadExcelBangLuong = async() =>{

      const { data } = await triggerDownload();
  
      if (data) {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob); 
        
        // Tạo thẻ <a> và mô phỏng hành động tải file
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bangLuong.xlsx'; // Tên file bạn muốn lưu
        document.body.appendChild(a);
        a.click();
        a.remove();
  
        // Giải phóng bộ nhớ
        window.URL.revokeObjectURL(url);
    }
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
          render: (text) => <p>{`${text?.toLocaleString()} VNĐ`} </p>
        },
        {
          title: 'Phụ cấp',
          dataIndex: 'phu_cap',
          key: 'phu_cap',
          render: (text) => <p>{`${text?.toLocaleString()} VNĐ`} </p>
        },
        {
            title: 'Khấu trừ',
            dataIndex: 'khau_tru',
            key: 'khau_tru',
            render: (text) => <p style={{color:"red"}}>{`${text?.toLocaleString()} VNĐ`} </p>
        },   
        {
          title: 'Ngày trả lương định kỳ',
          dataIndex: 'ngay_tra_luong',
          key: 'ngay_tra_luong',
        },
        {
          title: '',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <DrawerComponent  textButton={"Cập nhật"} content={<FormCreateBangLuong formValue={record}/>}  title={"Thông tin bảng lương của nhân viên"}/>
            </Space>
          ),
        },
      ];


  return (
   <div className='container'>
        <div style={{marginBottom:"40px"}}>
          <h1>Quản lý bảng lương 
            <div style={{float:"right"}}> 
              <DrawerComponent  textButton={"Thêm mới"} content={<FormCreateBangLuong/>} title={"Thông tin bảng lương"}/>
              <Button style={{ borderColor: 'green', color: 'green', marginLeft:"10px" }} onClick={handleClickDownloadExcelBangLuong}>Download excel</Button>
            </div>
          </h1>
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