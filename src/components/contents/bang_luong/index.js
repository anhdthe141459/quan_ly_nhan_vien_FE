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
import { useGetAllTenPhongBanQuery } from '../../../services/phongBanApis';




const { Option } = Select;


const BangLuongContent = () => {
    const [form] = Form.useForm();
    const { data:allBangLuong, error:allBangLuongEror, isLoading:allBangLuongIsLoading } = useGetAllBangLuongChoNhanVienQuery(undefined, {
        refetchOnMountOrArgChange: true,
      });
    const { data:allTenPhongBan,  } = useGetAllTenPhongBanQuery();
    const [triggerDownload,{ data:downloadExcelBangLuong }] = useLazyDownloadExcelBangLuongQuery();
    const [searchTerm, setSearchTerm] = useState('');

    const { data:searchBangLuong, error:searchBangLuongEror, isLoading:searchBangLuongIsLoading } = useSearchBangLuongQuery(
      searchTerm ? { ten_nhan_su: searchTerm.ten_nhan_su, ma_nhan_su: searchTerm.ma_nhan_su, ma_phong_ban:searchTerm.ma_phong_ban} : {},
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
    const optionTenPhongBans= allTenPhongBan?.map(phongBan=>{
      return {
          value:phongBan._id,
          label:phongBan.ten_phong_ban
      }
    })
  

    const handleClickDownloadExcelBangLuong = async() =>{

      await triggerDownload( { ma_nhan_su: searchTerm.ma_nhan_su, ten_nhan_su: searchTerm.ten_nhan_su,  
        ma_phong_ban:searchTerm.ma_phong_ban   }).unwrap().then((response) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'bangLuong.xlsx'); // Tên file tải xuống
        document.body.appendChild(link);
        link.click();
        link.remove();
        // Giải phóng bộ nhớ
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error('Error downloading file:', err);
      });
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
                <Col span={6}>
                <Form.Item
                    name="ma_phong_ban"

                >
                    <Select
                    placeholder="Phòng ban"
                    allowClear
                    style={{width: '100%'}}
                    showSearch
                    optionFilterProp="label"
                    options={optionTenPhongBans}
                />
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