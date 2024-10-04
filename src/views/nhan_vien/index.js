import React from 'react';
import LayoutUser from '../../components/layouts/user/index'
import NhanVienContent from '../../components/contents/nhan_vien';

const NhanVien = () => {
  return (
    <LayoutUser content={<NhanVienContent/>}/>
  );
}

export default NhanVien;