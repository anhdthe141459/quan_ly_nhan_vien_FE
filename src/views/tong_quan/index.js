import React from 'react';
import LayoutUser from '../../components/layouts/user/index'
import TongQuanContent from '../../components/contents/tong_quan';


const TongQuan = () => {
  return (
    <LayoutUser content={<TongQuanContent/>}/>
  );
}

export default TongQuan;