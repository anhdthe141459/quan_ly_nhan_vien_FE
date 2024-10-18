import React from 'react';
import LayoutUser from '../../../components/layouts/user';
import ThongKeLuongNhanVienContent from '../../../components/contents/thong_ke/thong_ke_luong_nhan_vien';


const ThongKeLuongNhanVien = () => {
  return (
    <LayoutUser content={<ThongKeLuongNhanVienContent/>}/>
  );
}

export default ThongKeLuongNhanVien;