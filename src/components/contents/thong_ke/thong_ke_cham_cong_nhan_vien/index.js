import React, { useEffect, useState ,useCallback } from 'react';
import { Space,Button,Popconfirm,Form,Col,Row,Input,Select,Table, DatePicker, TimePicker, message } from 'antd';
import {
    EyeOutlined,
  SearchOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useGetChamCongMoiThangQuery } from '../../../../services/chamCongApis';
import { useNavigate } from 'react-router-dom';





const { Option } = Select;


const ThongKeChamCongNhanVienContent = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const currentDate = dayjs();


    const [selectedMonth, setSelectedMonth] = useState(currentDate.month()+1);
    const [selectedYear, setSelectedYear] = useState(currentDate.year());
    

    const { data:allNhanVienChamCong, error:allNhanVienChamCongError, isLoading:allNhanVienChamCongIsLoading } = useGetChamCongMoiThangQuery([selectedYear,selectedMonth]);
    const onChangeDatePicker = (date, dateString) => {
        const [year, month] = dateString.split('-');
        setSelectedYear(year);
        setSelectedMonth(month);
        console.log(year, month);
    };
    const [searchData, setSearchData] = useState();
    const handleClickChiTietChamCongNhanVien = (id, ten_nhan_su, ma_nhan_su) => {
        navigate(`/thong_ke/cham_cong_nhan_vien/${id}`,{ state: { year: selectedYear, month: selectedMonth ,ten_nhan_su:ten_nhan_su, ma_nhan_su: ma_nhan_su  } });
      };

    const searchThongKeChamCong= (values) =>{
      if(!values.ma_nhan_su && !values.ten_nhan_su){
        setSearchData(allNhanVienChamCong);
      }else{
        const results = allNhanVienChamCong.filter(item => {
          // Kiểm tra từng điều kiện
          return Object.entries(values).every(([key, value]) => {
            if (!value) return true;
            return item[key].toString().toLowerCase().includes(value.toLowerCase());
          });
        });
        setSearchData(results);
      }
         
    }

    const handleSubmit = (event) => {
      event.preventDefault(); // Ngăn chặn gửi form mặc định
  
      // Gọi onFinish hoặc xử lý dữ liệu theo cách bạn muốn
      console.log("Form submission intercepted!");
    };
    
    const handleClickResetFormSearch = () =>{
      form.resetFields();
      setSearchData(allNhanVienChamCong);
    }

    useEffect(() => {
      if (allNhanVienChamCong) {
        setSearchData(allNhanVienChamCong); // Cập nhật state khi có dữ liệu mới
      }
    }, [allNhanVienChamCong]); 
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
          title: 'Số giờ làm việc',
          dataIndex: 'tongSoGioLamViec',
          key: 'tongSoGioLamViec',
        },
        {
          title: 'Số giờ làm thêm',
          dataIndex: 'tongSoGioLamThem',
          key: 'tongSoGioLamThem',
        },
  
        {
          title: '',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
                <EyeOutlined style={{ fontSize: '18px', margin: '0 10px', cursor: 'pointer' }} onClick={() => handleClickChiTietChamCongNhanVien(record.nhan_vien_id,record.ten_nhan_su,record.ma_nhan_su)}/>
            </Space>
          ),
        },
      ];


  return (
   <div className='container'>
        <div style={{marginBottom:"40px"}}>
          <h1>Thống kê chấm công của nhân viên </h1>
          <div className='search_phong_ban'>
          <Form 
            form={form}
            layout="vertical"
            onFinish={searchThongKeChamCong}
            onSubmit={handleSubmit}
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

export default ThongKeChamCongNhanVienContent;