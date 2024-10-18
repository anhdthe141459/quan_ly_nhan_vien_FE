import React from 'react';
import ChiTietChamCongNhanVienContent from '../../../../components/contents/thong_ke/thong_ke_cham_cong_nhan_vien/chi_tiet_cham_cong_nhan_vien';
import LayoutUser from '../../../../components/layouts/user';


const ChiTietChamCongNhanVien = () => {
  return (
    <LayoutUser content={<ChiTietChamCongNhanVienContent/>}/>
  );
}

export default ChiTietChamCongNhanVien;