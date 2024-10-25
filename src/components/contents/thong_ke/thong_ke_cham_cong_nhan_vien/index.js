import React, { useEffect, useState ,useCallback } from 'react';
import { Space,Button,Popconfirm,Form,Col,Row,Input,Select,Table, DatePicker, TimePicker, message } from 'antd';
import {
    EyeOutlined,
  SearchOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useDownloadExcelChamCongTheoThangMutation, useGetChamCongMoiThangQuery, useLazyDownloadExcelChamCongTheoThangQuery } from '../../../../services/chamCongApis';
import { useNavigate } from 'react-router-dom';
import { useGetAllTenPhongBanQuery } from '../../../../services/phongBanApis';





const { Option } = Select;


const ThongKeChamCongNhanVienContent = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const currentDate = dayjs();


    const [selectedMonth, setSelectedMonth] = useState(currentDate.month()+1);
    const [selectedYear, setSelectedYear] = useState(currentDate.year());
    const [triggerDownload, result] = useDownloadExcelChamCongTheoThangMutation();
    const { data:allTenPhongBan,  } = useGetAllTenPhongBanQuery();

    const { data:allNhanVienChamCong, error:allNhanVienChamCongError, isLoading:allNhanVienChamCongIsLoading } = useGetChamCongMoiThangQuery([selectedYear,selectedMonth]);
    const onChangeDatePicker = (date, dateString) => {
        const [year, month] = dateString.split('-');
        setSelectedYear(year);
        setSelectedMonth(month);
    };
    const [searchData, setSearchData] = useState();
    const handleClickChiTietChamCongNhanVien = (id, ten_nhan_su, ma_nhan_su) => {
        navigate(`/thong_ke/cham_cong_nhan_vien/${id}`,{ state: { year: selectedYear, month: selectedMonth ,ten_nhan_su:ten_nhan_su, ma_nhan_su: ma_nhan_su  } });
      };

    const searchThongKeChamCong= (values) =>{
      if(!values.ma_nhan_su && !values.ten_nhan_su && !values.ma_phong_ban){
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
    };
    
    const handleClickResetFormSearch = () =>{
      form.resetFields();
      setSearchData(allNhanVienChamCong);
    }
    const handleClickDownloadExcelChamCong = async() =>{

      await triggerDownload({chamCongs:searchData}).unwrap().then((response) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'chamCongNhanVien.xlsx'); // Tên file tải xuống
        document.body.appendChild(link);
        link.click();
        link.remove();
           // Giải phóng bộ nhớ
           window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error('Error downloading file:', err);
      });
  ;
  } 
  const optionTenPhongBans= allTenPhongBan?.map(phongBan=>{
    return {
        value:phongBan._id,
        label:phongBan.ten_phong_ban
    }
  })

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
          title: 'Số ngày đi làm',
          dataIndex: 'trang_thai_co_mat',
          key: 'trang_thai_co_mat',
        },
        {
          title: 'Số ngày nghỉ có phép',
          dataIndex: 'trang_thai_nghi_co_phep',
          key: 'trang_thai_nghi_co_phep',
        },
        {
          title: 'Số ngày nghỉ không phép',
          dataIndex: 'trang_thai_nghi_khong_phep',
          key: 'trang_thai_nghi_khong_phep',
        },
        {
          title: 'Số giờ làm việc chính thức',
          dataIndex: 'tongSoGioLamViecChinhThuc',
          key: 'tongSoGioLamViecChinhThuc',
        },
        {
          title: 'Số giờ làm thêm',
          dataIndex: 'tongSoGioLamThem',
          key: 'tongSoGioLamThem',
        },
        {
          title: 'Tổng số giờ làm được trong tháng',
          dataIndex: 'tong_so_gio_lam',
          key: 'tong_so_gio_lam',
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
          <h1>
            Thống kê chấm công của nhân viên 
            <div style={{float:"right"}}> 
              <Button style={{ borderColor: 'green', color: 'green', marginLeft:"10px" }} onClick={handleClickDownloadExcelChamCong}>Download excel</Button>
            </div>
          </h1>
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
          Chọn tháng  <DatePicker onChange={onChangeDatePicker} picker="month" defaultValue={currentDate}/>
        </div>
    <Table columns={columns} dataSource={searchData} />
  </div>
  );

}

export default ThongKeChamCongNhanVienContent;