import React from 'react';
import LayoutUser from '../../components/layouts/user/index'
import BangLuongContent from '../../components/contents/bang_luong';

const BangLuong = () => {
  return (
    <LayoutUser content={<BangLuongContent/>}/>
  );
}

export default BangLuong;