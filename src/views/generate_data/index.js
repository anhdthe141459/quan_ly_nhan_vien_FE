import { Button, Col, message, Row, Space, Spin } from 'antd';
import React from 'react';
import { useDeleteAllDataChamCongNhanVienMutation, useDeleteAllDataLuongNhanVienMutation, useDeleteAllDataNhanVienMutation, useDeleteAllPhongBanMutation, useGenaratePhongBanDataMutation, useGenerateChamCongNhanVienDataMutation, useGenerateLuongNhanVienDataMutation, useGenerateNhanVienDataMutation } from '../../services/generateDataApi';



const GenerateData = () => {

    const [genaratePhongBanData] = useGenaratePhongBanDataMutation();
    const [deleteAllPhongBan] =useDeleteAllPhongBanMutation();
    const [generateNhanVienData, { isLoading:generateNhanVienDataIsLoading}] = useGenerateNhanVienDataMutation();
    const [deleteAllNhanVien] =useDeleteAllDataNhanVienMutation();
    const [generateLuongNhanVienData] = useGenerateLuongNhanVienDataMutation();
    const [deleteAllLuongNhanVien] =useDeleteAllDataLuongNhanVienMutation();
    const [generateChamCongNhanVienData,{ isLoading:generateChamCongNhanVienDataIsLoading}] = useGenerateChamCongNhanVienDataMutation();
    const [deleteAllChamCongNhanVien,{isLoading:deleteAllChamCongNhanVienIsLoading}] =useDeleteAllDataChamCongNhanVienMutation();

    const handleClickTaoPhongBan = async() =>{
        await genaratePhongBanData().unwrap();
        message.success('Genarate data phòng ban thành công');
    }
    const handleClickTaoNhanVien = async() =>{
        await generateNhanVienData().unwrap();
        message.success('Genarate data nhân viên thành công');
    }
    const handleClickTaoLuongNhanVien = async() =>{
        await generateLuongNhanVienData().unwrap();
        message.success('Genarate data lương cho mỗi nhân viên thành công');
    }
    const handleClickTaoChamCongNhanVien = async() =>{
        await generateChamCongNhanVienData().unwrap();
        message.success('Genarate data chấm công cho mỗi nhân viên thành công');
    }
    const handleClickDeleteAllPhongBan = async() =>{
        await deleteAllPhongBan().unwrap();
        message.success('Xóa data phòng ban thành công');
    }
    const handleClickDeleteAllNhanVien = async() =>{
        await deleteAllNhanVien().unwrap();
        message.success('Xóa data nhân viên thành công');
    }
    const handleClickDeleteAllLuongNhanVien = async() =>{
        await deleteAllLuongNhanVien().unwrap();
        message.success('Xóa data lương cho mỗi nhân viên thành công');
    }
    const handleClickDeleteAllChamCongNhanVien = async() =>{
        await deleteAllChamCongNhanVien().unwrap();
        message.success('Xóa data chấm công cho mỗi nhân viên thành công');
    }
    if(generateNhanVienDataIsLoading){
        return (
          <div className='container' style={{display:"flex", justifyContent:"center", alignItems:"center", height:"70vh"}}>
            <Spin tip="Loading" size="large" />
          </div>
        )
      } 
    if(generateChamCongNhanVienDataIsLoading){
        return (
            <div className='container' style={{display:"flex", justifyContent:"center", alignItems:"center", height:"70vh"}}>
            <Spin tip="Loading" size="large" />
            </div>
        )
    } 
    if(deleteAllChamCongNhanVienIsLoading){
        return (
            <div className='container' style={{display:"flex", justifyContent:"center", alignItems:"center", height:"70vh"}}>
            <Spin tip="Loading" size="large" />
            </div>
        )
    } 
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"500px"}}>
       <div >
            <div style={{marginBottom:"20px"}}>
                <Row gutter={16}>
                    <Col>
                        <Button color='primary' onClick={handleClickTaoPhongBan}>
                            Tạo 100 phòng ban
                        </Button>
                    </Col>
                    <Col>
                        <Button danger onClick={handleClickDeleteAllPhongBan}>
                            Xóa toàn bộ phòng ban
                        </Button>
                    </Col>
                </Row>
            </div>
            <div style={{marginBottom:"20px"}}>
                <Row gutter={16}>
                    <Col>
                        <Button color='primary' onClick={handleClickTaoNhanVien}>
                            Tạo 2000 nhân viên
                        </Button>
                    </Col>
                    <Col>
                        <Button danger onClick={handleClickDeleteAllNhanVien}>
                            Xóa toàn bộ nhân viên
                        </Button>
                    </Col>
                </Row>
            </div>
            <div style={{marginBottom:"20px"}}>
                <Row gutter={16}>
                    <Col>
                        <Button color='primary' onClick={handleClickTaoLuongNhanVien}>
                            Thêm bảng lương cho mỗi nhân viên
                        </Button>
                    </Col>
                    <Col>
                        <Button danger onClick={handleClickDeleteAllLuongNhanVien}>
                            Xóa toàn bộ bảng lương của nhân viên
                        </Button>
                    </Col>
                </Row>
            </div>
            <div style={{marginBottom:"20px"}}>
                <Row gutter={16}>
                    <Col>
                        <Button color='primary' onClick={handleClickTaoChamCongNhanVien}>
                            Thêm chấm công cho nhân viên trong năm
                        </Button>
                    </Col>
                    <Col>
                        <Button danger onClick={handleClickDeleteAllChamCongNhanVien}>
                            Xóa toàn bộ chấm công của nhân viên
                        </Button>
                    </Col>
                </Row>
            </div>
       </div>
       
    </div>
  );
}

export default GenerateData;