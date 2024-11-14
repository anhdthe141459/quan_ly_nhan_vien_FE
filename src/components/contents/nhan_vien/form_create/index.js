import React, { useEffect, useRef, useState } from 'react';
import {Col, DatePicker, Form, Input, Row, Select,Button, Space } from 'antd';
import { useCreateOrUpdateNhanVienMutation,useGetAllNhanVienQuery, useGetAvatarNhanVienQuery } from '../../../../services/nhanvienApis';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer } from '../../../../redux/slices/isOpenDrawerSlice';
import dayjs from 'dayjs';
import { useGetAllTenPhongBanQuery } from '../../../../services/phongBanApis';
import ImageUploader from '../../../upload_image';
const { Option } = Select;


const FormCreateNhanVien = (props) => {
  const {formValue}=props;
  const { data:allTenPhongBan, error:allTenPhongBanPhongError, isLoading:allTenPhongBanIsLoading } = useGetAllTenPhongBanQuery();
  const { data:getAvatar, error:getAvatarError, isLoading:getAvatarIsLoading } = useGetAvatarNhanVienQuery(formValue?._id, {
    skip: !formValue?._id, // Skip query nếu `id` không có giá trị
  });

  const [createOrUpdateNhanVien, result] = useCreateOrUpdateNhanVienMutation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(null);
  const avatarRef = useRef();
  // const getAvatar = (value) =>{
  //   setAvatar(value);
  // }

  function generateRandomCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomLetters = '';
    
    for (let i = 0; i < 2; i++) {
      randomLetters += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    const randomNumbers = Math.floor(100000 + Math.random() * 900000).toString();
  
    let result = randomLetters + randomNumbers;
  
    return result;
  }
  

  if(formValue!=undefined){
    const dataForm={
      ...formValue,
      _id:formValue._id,
      nam_sinh: dayjs(formValue.nam_sinh),
      ngay_cap_cccd:dayjs(formValue.ngay_cap_cccd),
    }
    form.setFieldsValue(dataForm);
    form.setFieldsValue({ma_phong_ban:formValue.ten_phong_ban});
  }

  const defaultValues = {
    ma_nhan_su:formValue!=undefined?formValue.ma_nhan_su:generateRandomCode(),
    chuc_vu: 'Nhân viên',
    thoi_gian_cong_hien: '0',
    quoc_tich:'Việt Nam',
  };

  const onClose = () => {
    dispatch(closeDrawer());
  };

  const onFinish = async(values) => {
    const finalValues = {
      ...defaultValues,
      ...values,
    };
    
    if(formValue){
      finalValues._id=formValue._id;
      if(finalValues.ma_phong_ban==formValue.ten_phong_ban) {
        finalValues.ma_phong_ban=formValue.ma_phong_ban
      }
    }

    
    const {ma_nhan_su,chuc_vu, thoi_gian_cong_hien,ma_phong_ban,so_cccd,ngay_cap_cccd,noi_cap_cccd, ...nhanVien}=finalValues;
    nhanVien.avatar=avatarRef.current;
    const chucVuCoQuan={ma_nhan_su,chuc_vu,thoi_gian_cong_hien,ma_phong_ban};

    if(chucVuCoQuan.ma_phong_ban==undefined){
      chucVuCoQuan.ma_phong_ban=null;
    }
    const nhanVienCccd={so_cccd,ngay_cap_cccd,noi_cap_cccd};
    await createOrUpdateNhanVien({nhanVien:nhanVien,chucVuCoQuan:chucVuCoQuan,nhanVienCccd:nhanVienCccd}).unwrap();
    form.resetFields();
    onClose();
  };

  const optionTenPhongBans= allTenPhongBan?.map(phongBan=>{
    return {
        value:phongBan._id,
        label:phongBan.ten_phong_ban
    }
  })


  return (
    <Form 
      form={form}
      initialValues={defaultValues}
      layout="vertical"
      onFinish={onFinish}
    >

    <Row gutter={16} >
      <Col span={16}>
        <Form.Item
          name="ten_nhan_su"
          label="Tên nhân sự"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống tên nhân sự',
            },
          ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
          name="so_dien_thoai"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống số điện thoại',
            },
            {
              pattern: /^0[3|5|7|8|9][0-9]{8}$/,
              message: 'Số điện thoại không hợp lệ!',
            },
          ]}
        >
             <Input/>
        </Form.Item>
      </Col>
      <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Form.Item name="avatar" label="Ảnh đại diện">
          <ImageUploader ref={avatarRef} avatar={getAvatar?.avatar} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={7}>
        <Form.Item
          name="ma_nhan_su"
          label="Mã nhân viên"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống mã nhân sự',
            },
          ]}
        >
            <Input/>          
        </Form.Item>

      </Col>
      <Col span={5}>
        <Form.Item
          name="nam_sinh"
          label="Ngày sinh"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn ngày sinh!',
            },
          ]}
        >
            <DatePicker/>
        </Form.Item>

      </Col>
      <Col span={6}>
        <Form.Item
          name="gioi_tinh"
          label="Giới tính"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn giới tính',
            },
          ]}
        >
          <Select>
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
          </Select>            
        </Form.Item>

      </Col>
      <Col span={6}>
        <Form.Item
          name="quoc_tich"
          label="Quốc tịch"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống quốc tịch',
            },
          ]}
        >
            <Input />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={7}>
        <Form.Item
          name="so_cccd"
          label="Số CCCD"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống số CCCD',
            },
          ]}
        >
            <Input/>          
        </Form.Item>

      </Col>
      <Col span={5}>
        <Form.Item
          name="ngay_cap_cccd"
          label="Ngày cấp CCCD"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn ngày cấp CCCD!',
            },
          ]}
        >
            <DatePicker/>
        </Form.Item>

      </Col>
      <Col span={12}>
        <Form.Item
          name="trinh_do_van_hoa"
          label="Trình độ văn hóa"
        >
        <Input/>          
        </Form.Item>

      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="noi_cap_cccd"
          label="Nơi cấp CCCD"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn nơi cấp CCCD!',
            },
          ]}
        >
            <Input/>          
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          name="dan_toc"
          label="Dân tộc"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống dân tộc',
            },
          ]}
        >
            <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          name="ton_giao"
          label="Tôn giáo"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống tô giáo',
            },
          ]}
        >
            <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="noi_sinh"
          label="Nơi sinh"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống nơi sinh',
            },
          ]}
        >
          <Input/>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="nguyen_quan"
          label="Nguyên quán"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống nguyên quán',
            },
          ]}
        >
          <Input/>
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="dia_chi_hien_tai"
          label="Địa chỉ hiện tại"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống địa chỉ hiện tại',
            },
          ]}
        >
          <Input/>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="tinh_trang_hon_nhan"
          label="Tình trạng hôn nhân"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống tình trạng hôn nhân',
            },
          ]}
        >
            <Input/>
        </Form.Item>
      </Col>
    </Row>
    <Space/>
    <Row gutter={16}>


    </Row>
    <Row gutter={16}>
      <Col span={6}>
        <Form.Item
          name="chuc_vu"
          label="Chức vụ"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống chức vụ',
            },
          ]}
        >
            <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          name="thoi_gian_cong_hien"
          label="Số năm cống hiến"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để số năm làm việc',
            },
          ]}
        >
            <Input/>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="ma_phong_ban"
          label="Phòng ban"
        >
            <Select
                allowClear
                style={{width: '100%'}}
                showSearch
                optionFilterProp="label"
                options={optionTenPhongBans}
            />
        </Form.Item>
        </Col>
    </Row>
    <Row gutter={16}>
         
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Button style={{width:"100px"}} type="primary" htmlType="submit">
            Gửi
          </Button>
        </Form.Item>
      </Col>
      
    </Row>
   
  </Form>  
  );
}

export default FormCreateNhanVien;