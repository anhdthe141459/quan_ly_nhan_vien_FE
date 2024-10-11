import React from 'react';
import LayoutUser from '../../components/layouts/user/index'
import ChamCongContent from '../../components/contents/cham_cong';

const ChamCong = () => {
  return (
    <LayoutUser content={<ChamCongContent/>}/>
  );
}

export default ChamCong;