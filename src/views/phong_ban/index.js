import React from 'react';
import LayoutUser from '../../components/layouts/user/index'
import PhongBanContent from '../../components/contents/phong_ban';

const PhongBan = () => {
  return (
    <LayoutUser content={<PhongBanContent/>}/>
  );
}

export default PhongBan;