import React, { useEffect, useState ,useCallback } from 'react';
import { Space,Button,Popconfirm,Form,Col,Row,Input,Select,Table, DatePicker, TimePicker, message } from 'antd';
import {
    EyeOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useGetLuongNhanVienTheoThangQuery } from '../../../../services/bangLuongApis';





const { Option } = Select;


const ThongKeLuongNhanVienContent = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const currentDate = dayjs();
    const [searchData, setSearchData] = useState();
    const [selectedMonth, setSelectedMonth] = useState(currentDate.month()+1);
    const [selectedYear, setSelectedYear] = useState(currentDate.year());
    const { data:luongNhanVienTheoThang, error:luongNhanVienTheoThangError, isLoading:luongNhanVienTheoThangIsLoading } = useGetLuongNhanVienTheoThangQuery([selectedYear,selectedMonth], {
      refetchOnMountOrArgChange: true,
    });
    const onChangeDatePicker = (date, dateString) => {
        const [year, month] = dateString.split('-');
        setSelectedYear(year);
        setSelectedMonth(month);
        console.log(year, month);
    };

    const searchLuongNhanVien= (values) =>{
      if(!values.ma_nhan_su && !values.ten_nhan_su){
        setSearchData(luongNhanVienTheoThang);
      }else{
        const results = luongNhanVienTheoThang.filter(item => {
          // Kiểm tra từng điều kiện
          return Object.entries(values).every(([key, value]) => {
            if (!value) return true;
            return item[key].toString().toLowerCase().includes(value.toLowerCase());
          });
        });
        setSearchData(results);
      }
         
    }
    const handleClickResetFormSearch = () =>{
      form.resetFields();
      setSearchData(luongNhanVienTheoThang);
    }

    useEffect(() => {
      if (luongNhanVienTheoThang) {
        setSearchData(luongNhanVienTheoThang); // Cập nhật state khi có dữ liệu mới
      }
    }, [luongNhanVienTheoThang]);

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
          title: 'Tiền lương cơ bản',
          dataIndex: 'tien_luong_co_ban',
          key: 'tien_luong_co_ban',
        },
        {
          title: 'Tổng số công giờ làm',
          dataIndex: 'tongSoCongNhanVien',
          key: 'tongSoCongNhanVien',
        },
        {
          title: 'Tiền lương thực nhận',
          dataIndex: 'tien_luong_thuc_nhan',
          key: 'tien_luong_thuc_nhan',
          render: (text) => <p style={{color:"blue"}}>{text} </p>
        },
        {
          title: 'Ngày trả lương định kỳ',
          dataIndex: 'ngay_tra_luong',
          key: 'ngay_tra_luong',
        },
  
      ];


  return (
   <div className='container'>
      <div style={{marginBottom:"40px"}}>
        <h1>Thống kê lương của nhân viên </h1>
        <div className='search_phong_ban'>
        <Form 
          form={form}
          layout="vertical"
          onFinish={searchLuongNhanVien}
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
        Chọn tháng  <DatePicker onChange={onChangeDatePicker} picker="month" defaultValue={currentDate}/>
      </div>
    <Table columns={columns} dataSource={searchData} />
  </div>
  );

}

export default ThongKeLuongNhanVienContent;