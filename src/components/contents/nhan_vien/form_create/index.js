import React, { useEffect } from 'react';
import {Col, DatePicker, Form, Input, Row, Select,Button, Space } from 'antd';
import { useCreateOrUpdateNhanVienMutation,useGetAllNhanVienQuery } from '../../../../services/nhanviensApi';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer } from '../../../../redux/slices/isOpenDrawerSlice';
import dayjs from 'dayjs';
const { Option } = Select;


const FormCreateNhanVien = (props) => {
  const [createOrUpdateNhanVien, result] = useCreateOrUpdateNhanVienMutation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {formValue}=props;
  console.log("formValue===========",formValue)

  if(formValue!=undefined){
    const dataForm={
      ...formValue,
      _id:formValue._id,
      nam_sinh: dayjs(formValue.nam_sinh)
    }
    form.setFieldsValue(dataForm);
  }


  const onClose = () => {
    dispatch(closeDrawer());
  };

  const onFinish = async(values) => {
    await createOrUpdateNhanVien(values).unwrap();
    onClose();
  };
  const handleReset = () => {
    form.resetFields(); // Reset tất cả các field
  };
  return (
    <Form 
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >

    <Row gutter={16}>
      <Col span={12}>
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
      </Col>
      <Col span={12}>
        <Form.Item
          name="so_dien_thoai"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống số điện thoại',
            },
          ]}
        >
            <Input />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={6}>
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
        >
          <Select>
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
          </Select>            
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
      <Col span={12}>
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
      <Col span={24}>
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
    </Row>
    <Row gutter={16}>
      <Col span={24}>
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
      <Col span={24}>
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
    </Row>
    <Space/>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item wrapperCol={{ offset: 18, span: 16 }}>
          <Button style={{width:"100px"}} type="primary" htmlType="submit">
            Gửi
          </Button>
          {/* <Button style={{marginLeft:"20px"}} onClick={handleReset} >
            Cancel
          </Button> */}
        </Form.Item>
      </Col>
      
    </Row>
   
  </Form>  
  );
}

export default FormCreateNhanVien;