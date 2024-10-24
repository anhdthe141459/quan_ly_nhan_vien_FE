import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeftOutlined
  } from '@ant-design/icons';
import { Col, Row, Table } from 'antd';
import { useLocation } from 'react-router-dom';
import { useGetChamCongNhanVienChiTietTheoThangQuery, useGetTrangThaiCuaNhanVienMoiThangQuery } from '../../../../../services/chamCongApis';
import dayjs from 'dayjs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
} from 'recharts';


const ChiTietChamCongNhanVienContent = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const { year, month, ten_nhan_su, ma_nhan_su } = location.state || {}; 
    const { id } = useParams(); 

    const { data:allNhanVienChamCong,} = useGetChamCongNhanVienChiTietTheoThangQuery([year, month, id]);
    const { data:countTrangThaiChamCongCuaNhanVien } = useGetTrangThaiCuaNhanVienMoiThangQuery([year, month, id]);
    const [daysInMonth, setDaysInMonth] = useState([]);
    const goBack = () => {
        navigate(-1); // Quay lại trang trước đó
    };
    useEffect(() => {
      const getDaysInCurrentMonth = () => {
        const today = dayjs(); // Lấy ngày hiện tại
        const year = today.year();
        const month = today.month(); // 0-11 (0 = January, 11 = December)
  
        // Xác định số ngày trong tháng
        const daysInCurrentMonth = today.daysInMonth();
        
        // Tạo mảng chứa các ngày trong tháng
        const daysArray = Array.from({ length: daysInCurrentMonth }, (_, i) => {
          return {
            date:today,
            day: today.date(i + 1).format('DD/MM/YYYY'), // Định dạng ngày
          };
        });
  
        return daysArray;
      };
  
      // Cập nhật state
      const daysArray = getDaysInCurrentMonth();
      setDaysInMonth(daysArray);
    }, []);
 
    const columns = [
        {
            title: 'Ngày chấm công',
            dataIndex: 'ngay_cham_cong',
            key: 'ngay_cham_cong',
            render: (text) => <p>{new Date(text).toLocaleDateString()}</p>,
          },
        {
          title: 'Giờ vào',
          dataIndex: 'gio_vao',
          key: 'gio_vao',
          render: (text) => <p>{text?dayjs(text).format('HH:mm:ss'):''}</p>,
        },
        {
          title: 'Giờ ra',
          dataIndex: 'gio_ra',
          key: 'gio_ra',
          render: (text) => <p>{text?dayjs(text).format('HH:mm:ss'):''}</p>,

        },
        {
            title: 'Số giờ làm việc chính thức',
            dataIndex: 'so_gio_lam_viec',
            key: 'so_gio_lam_viec',
            render: (text) => {
              return <p style={{color:"blue"}}>{text}</p>; 
            },
        },
        {
          title: 'Số giờ làm thêm',
          dataIndex: 'so_gio_lam_them',
          key: 'so_gio_lam_them',
          render: (text) => {
            return <p style={{color:"#FFBB28"}}>{text}</p>; 
          },
        },
        {
          title: 'Trạng thái',
          dataIndex: 'trang_thai',
          key: 'trang_thai',
          render: (text) => {
            if(text=="co_mat"){
              return "Có mặt"
            }else if(text=="nghi_co_phep"){
              return "Nghỉ có phép"
            }else if(text=="nghi_khong_phep"){
              return "Nghỉ không phép"
            }
          },
        },
    
      ];
      function formatDate(inputDate) {
        // Tách ngày, tháng, và năm từ chuỗi input
        const [day, month, year] = inputDate.split('/');
    
        // Đảm bảo ngày và tháng có 2 chữ số
        const formattedDay = day.padStart(2, '0');
        const formattedMonth = month.padStart(2, '0');
    
        // Kết hợp lại theo định dạng "DD/MM/YYYY"
        return `${formattedDay}/${formattedMonth}/${year}`;
    }
      const data= daysInMonth.map(day =>{
        const attendance = allNhanVienChamCong?.find(
          att => formatDate(new Date(att.ngay_cham_cong).toLocaleDateString()) === day.day
        );
        return{
          ...day,
          so_gio_lam_viec:attendance ? attendance.so_gio_lam_viec : 0,
          so_gio_lam_them:attendance ? (attendance?.so_gio_lam_them== undefined ? 0 : attendance.so_gio_lam_them ) : 0
        }
      })
      const attendance1= allNhanVienChamCong?.map(
        att => new Date(att.ngay_cham_cong).toLocaleDateString()
      );

      
      const countTrangThaiChamCong = [
        { name: 'Có mặt', value: countTrangThaiChamCongCuaNhanVien?.co_mat },
        { name: 'Nghỉ có phép', value: countTrangThaiChamCongCuaNhanVien?.nghi_co_phep },
        { name: 'Nghỉ không phép', value: countTrangThaiChamCongCuaNhanVien?.nghi_khong_phep},
      ];

      const COLORS = ['#00C49F', '#a19430', '#FF8042'];

      const renderCustomizedLabel = ({ percent, name }) => {
        if (percent === 0) return null; 
        return `${name}: ${(percent * 100).toFixed(1)}%`;
      };
    return(
        <>
            <div style={{marginBottom:"40px"}}>
            <div style={{marginBottom:"30px"}}>
              <a style={{fontSize:"18px"}} onClick={goBack}>
              <ArrowLeftOutlined /> Trở lại
              </a>
            </div>
            <h1>Chi tiết chấm công của  <span style={{color:"red"}}>{ten_nhan_su} - {ma_nhan_su}</span></h1>
            </div>
            <div style={{marginBottom:"30px",justifyContent:"center",alignItems:"center",display:"flex"}}>
              <Row>
                <Col span={16}>
                <h3 style={{marginLeft:"10px"}}>Biểu đồ thống kê số giờ làm việc của nhân viên</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {/* Cột đầu tiên */}
                      <Bar dataKey="so_gio_lam_viec" fill="#0088FE" name="Số giờ làm việc của ngày đó" />
                      {/* Cột thứ hai */}
                      <Bar dataKey="so_gio_lam_them" fill='#FFBB28' name="Số giờ làm thêm" />
                    </BarChart>
                  </ResponsiveContainer>
                </Col>
                <Col span={8}>
                <h3 style={{marginLeft:"10px"}}>Biểu đồ thống kê tỉ lệ có mặt và nghỉ của nhân viên</h3>
                  <PieChart width={550} height={400}>
                    <Pie
                      data={countTrangThaiChamCong}
                      cx={'40%'}
                      cy={'50%'}
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </Col>
              </Row>
            </div>
            <div>
                <Table columns={columns} dataSource={allNhanVienChamCong} />
            </div>
        </>
    )
}
export default ChiTietChamCongNhanVienContent