import React, { useEffect,useState } from 'react';
import {Col, DatePicker, Form, Input, Row, Select,Button, Space } from 'antd';
import { useCreateOrUpdateNhanVienMutation,useGetAllNhanVienQuery } from '../../../../services/nhanvienApis';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer } from '../../../../redux/slices/isOpenDrawerSlice';
import dayjs from 'dayjs';
import { useCreateOrUpdateBangLuongMutation, useGetAllTenNhanVienChuaCoBangLuongQuery } from '../../../../services/bangLuongApis';
const { Option } = Select;


const FormCreateBangLuong = (props) => {
  const {formValue}=props;
  const { data:allNhanVienChuaCoBangLuong, error:allNhanVienChuaCoBangLuongError, isLoading:allNhanVienChuaCoBangLuongIsLoading } = useGetAllTenNhanVienChuaCoBangLuongQuery();

  const [createOrUpdateBangLuong, result] = useCreateOrUpdateBangLuongMutation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  if(formValue!=undefined){
    const dataForm={
      ...formValue,
      _id:formValue._id,
    }
    form.setFieldsValue(dataForm);
    form.setFieldsValue({nhan_vien_id:formValue.ten_nhan_su});
  }

  const onClose = () => {
    dispatch(closeDrawer());
  };

  const onFinish = async(values) => {
    if(formValue){
        values._id=formValue._id;
        values.nhan_vien_id=formValue.nhan_vien_id
    }
    await createOrUpdateBangLuong({bangLuong:values}).unwrap();
    form.resetFields();
    onClose();
  };
  const optionTenNhanVienChuaCoBangLuong= allNhanVienChuaCoBangLuong?.map(nhanVien=>{
    return {
        value:nhanVien.nhan_vien_id,
        label:`${nhanVien.ma_nhan_su} - ${nhanVien.ten_nhan_su}`
    }
  })

  return (
    <Form 
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="nhan_vien_id"
          label={formValue==undefined?"Nhân viên chưa có bảng lương":"Nhân viên"}
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn nhân viên',
            },
          ]}
        >
          <Select
            disabled={formValue==undefined?false:true}
            allowClear
            style={{width: '100%'}}
            showSearch
            optionFilterProp="label"
            options={optionTenNhanVienChuaCoBangLuong}
         />
        </Form.Item>
      </Col>

    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="tien_luong"
          label="Lương cơ bản"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống tiền lương hàng tháng',
            },
          ]}
        >
            <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="phu_cap"
          label="Phụ cấp"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống phụ cấp hàng tháng',
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
          name="khau_tru"
          label="Khấu trừ"
        >
           <Input />
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item
          name="ngay_tra_luong"a
          label="Ngày trả lương định kỳ"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống ngày trả lương',
            },
            {
              pattern: /\b([1-9]|1[0-9]|2[0-9]|30|31)\b/,
              message: 'Ngày trả lương chỉ từ 1 đến 31',
            },
          ]}
        >
            <Input/>
        </Form.Item>
      </Col>
    </Row>
    {/* <Row gutter={16}>
        <Col span={12}>
        <Form.Item
          name="tien_luong_thuc_nhan"
          label="Tiền lương thực nhận"
        >
           <Input disabled/>
        </Form.Item>
        </Col>

    </Row> */}
    
    <Space/>


    <Row gutter={16}>
      <Col span={12}>
        <Form.Item wrapperCol={{ offset: 0, span: 2 }}>
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

export default FormCreateBangLuong;