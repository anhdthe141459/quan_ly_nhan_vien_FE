import React, { useEffect, useState } from 'react';
import { Space,Button,Popconfirm,Form,Col,Row,Input,Select,Table } from 'antd';
import { useGetAllNhanVienQuery, useLazyDownloadExcelNhanVienQuery, useLazySearchNhanVienQuery, useRemoveNhanVienMutation, } from '../../../services/nhanvienApis';
import DrawerComponent from '../../drawer';
import FormCreateNhanVien from './form_create';
import {
  SearchOutlined
} from '@ant-design/icons';
import { useGetAllTenPhongBanQuery } from '../../../services/phongBanApis';

const { Option } = Select;


const NhanVienContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm();
  const { data:allNhanVien, error:allNhanVienEror, isLoading:allNhanVienIsLoading } = useGetAllNhanVienQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [triggerDownload,{ data:downloadExcelNhanVien}] = useLazyDownloadExcelNhanVienQuery();
  const { data:allTenPhongBan,  } = useGetAllTenPhongBanQuery();
  const  [triggerSearch,{data:searchNhanVien} ] = useLazySearchNhanVienQuery();
  const nhanViens = searchTerm ? searchNhanVien : allNhanVien;
  const onSearchNhanVien = async(values) => {
    const searchQuery =values ? { ten_nhan_su: values.ten_nhan_su, so_dien_thoai: values.so_dien_thoai, gioi_tinh: values.gioi_tinh,
      nguyen_quan: values.nguyen_quan, dia_chi_hien_tai:values.dia_chi_hien_tai,quoc_tich: values.quoc_tich,
       ma_nhan_su: values.ma_nhan_su, thoi_gian_cong_hien:values.thoi_gian_cong_hien, chuc_vu: values.chuc_vu, 
       so_cccd: values.so_cccd, phong_ban_id:values.phong_ban_id   } : {};
    await triggerSearch(searchQuery);
    setSearchTerm(values);
// Nếu có từ khóa, gọi API tìm kiếm
   
  };
  const handleClickResetFormSearch = () =>{
    form.resetFields();
    setSearchTerm();
  }
  const [removeNhanVien] =useRemoveNhanVienMutation();
  const handleClickRemoveNhanVien = (id) =>{
    removeNhanVien(id);
  }
  const optionTenPhongBans= allTenPhongBan?.map(phongBan=>{
    return {
        value:phongBan._id,
        label:phongBan.ten_phong_ban
    }
  })

  const handleClickDownloadExcelNhanVien = async() =>{

    await triggerDownload( { ten_nhan_su: searchTerm.ten_nhan_su, so_dien_thoai: searchTerm.so_dien_thoai, gioi_tinh: searchTerm.gioi_tinh,
      nguyen_quan: searchTerm.nguyen_quan, dia_chi_hien_tai:searchTerm.dia_chi_hien_tai,quoc_tich: searchTerm.quoc_tich,
       ma_nhan_su: searchTerm.ma_nhan_su, thoi_gian_cong_hien:searchTerm.thoi_gian_cong_hien, chuc_vu: searchTerm.chuc_vu, 
       so_cccd: searchTerm.so_cccd, phong_ban_id:searchTerm.phong_ban_id   }).unwrap().then((response) => {
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'nhan_vien.xlsx'); // Tên file tải xuống
      document.body.appendChild(link);
      link.click();
      link.remove();
         // Giải phóng bộ nhớ
         window.URL.revokeObjectURL(url);
    })
    .catch((err) => {
      console.error('Error downloading file:', err);
    });

    // if (data) {
    //   const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //   const url = window.URL.createObjectURL(blob);
      
    //   // Tạo thẻ <a> và mô phỏng hành động tải file
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = 'nhanvien.xlsx'; // Tên file bạn muốn lưu
    //   document.body.appendChild(a);
    //   a.click();
    //   a.remove();

      // // Giải phóng bộ nhớ
      // window.URL.revokeObjectURL(url);
  }


  const columns = [
    {
      title: 'Mã nhân sự',
      dataIndex: 'ma_nhan_su',
      key: 'ma_nhan_su',
    },
    {
      title: 'Tên nhân sự',
      dataIndex: 'ten_nhan_su',
      key: 'ten_nhan_su',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gioi_tinh',
      key: 'gioi_tinh',
      render: (text) => text=="male"?<p>Nam</p>:<p>Nữ</p>,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'nam_sinh',
      key: 'nam_sinh',
      render: (text) => <p>{new Date(text).toLocaleDateString()}</p>,
    },
    {
      title: 'Nơi sinh',
      dataIndex: 'noi_sinh',
      key: 'noi_sinh',
    },
    {
      title: 'Nguyên quán',
      dataIndex: 'nguyen_quan',
      key: 'nguyen_quan',
    },
    {
      title: 'Địa chỉ hiện tại',
      dataIndex: 'dia_chi_hien_tai',
      key: 'dia_chi_hien_tai',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'so_dien_thoai',
      key: 'so_dien_thoai',
    },
    {
      title: 'Dân tộc',
      dataIndex: 'dan_toc',
      key: 'dan_toc',
    },
    {
      title: 'Tôn giáo',
      dataIndex: 'ton_giao',
      key: 'ton_giao',
    },
    {
      title: 'Trình độ văn hóa',
      dataIndex: 'trinh_do_van_hoa',
      key: 'trinh_do_van_hoa',
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <DrawerComponent textButton={"Cập nhật"} content={<FormCreateNhanVien formValue={record}/>}/>
          <Popconfirm
            title="Xóa nhân viên"
            description="Bạn có chắc chắn muốn xóa nhân sự này"
            okText="Có"
            cancelText="Không"
            onConfirm={() =>handleClickRemoveNhanVien(record._id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  return (
    <div className='container'>
        <div style={{marginBottom:"40px"}}>
          <h1>Quản lý nhân sự 
            <div style={{float:"right"}}>
               <DrawerComponent  textButton={"Thêm mới"} content={<FormCreateNhanVien/>} title={"Thông tin nhân sự"}/> 
               <Button style={{ borderColor: 'green', color: 'green', marginLeft:"10px" }} onClick={handleClickDownloadExcelNhanVien}>Download excel</Button>
            </div>
          </h1>
          <div className='search_nhan_vien'>
          <Form 
            form={form}
            layout="vertical"
            onFinish={onSearchNhanVien}
          >

          <Row gutter={16}>
          <Col span={3}>
              <Form.Item
                  name="ma_nhan_su"
                >
                    <Input placeholder="Mã nhân sự"/>
                </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                  name="ten_nhan_su"
                >
                    <Input placeholder="Tên nhân sự"/>
                </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="so_dien_thoai"

              >
                <Input placeholder="Số điện thoại"/>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item
                name="gioi_tinh"
              >
                <Select placeholder="Giới tính">
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
                </Select>  
              </Form.Item>
            </Col>  
            <Col span={3}>
              <Form.Item
                name="thoi_gian_cong_hien"
              >
                <Input placeholder="Số năm làm việc">
                </Input>  
              </Form.Item>
            </Col>    
            <Col span={4}>
              <Form.Item
                name="so_cccd"
              >
                <Input placeholder="Số CCCD">
                </Input>  
              </Form.Item>
            </Col>     
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="nguyen_quan"

              >
                <Input placeholder="Nguyên quán"/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="dia_chi_hien_tai"
              >
                <Input placeholder='Địa chỉ hiện tại'/>
              </Form.Item>
            </Col>  
            <Col span={4}>
              <Form.Item
                name="quoc_tich"
              >
                <Input placeholder='Quốc tịch'/>
              </Form.Item>
            </Col>
            <Col span={4}>
            <Form.Item
              name="phong_ban_id"
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
            <Col span={4}>
              <Form.Item
                name="chuc_vu"
              >
                <Input placeholder='Chức vụ'/>
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
        </div>
        <Table columns={columns} dataSource={nhanViens} rowKey="_id"/>
    </div>
  );

}

export default NhanVienContent;