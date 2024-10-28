import React, { useEffect,useState } from 'react';
import {Col, DatePicker, Form, Input, Row, Select,Button, Space } from 'antd';
import { useCreateOrUpdateNhanVienMutation,useGetAllNhanVienQuery } from '../../../../services/nhanvienApis';
import { useCreateOrUpdatePhongBanMutation } from '../../../../services/phongBanApis';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer } from '../../../../redux/slices/isOpenDrawerSlice';
import dayjs from 'dayjs';
import { useGetAllNhanVienNotPhongBanQuery } from '../../../../services/phongBanApis';
const { Option } = Select;


const FormCreatePhongBan = (props) => {
  const {formValue}=props;
  const { data:allNhanVienNotTruongPhong, error:allNhanVienNotTruongPhongError, isLoading:allNhanVienNotTruongPhongIsLoading } = useGetAllNhanVienNotPhongBanQuery(formValue?._id);
  const [createOrUpdatePhongBan, result] = useCreateOrUpdatePhongBanMutation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  if(formValue!=undefined){
    const dataForm={
      ...formValue,
      _id:formValue._id,
      ngay_thanh_lap: dayjs(formValue.ngay_thanh_lap),
    }
    form.setFieldsValue(dataForm);
    if(formValue.hasOwnProperty('ten_truong_phong')){
      form.setFieldsValue({ma_truong_phong:formValue.ten_truong_phong});
    }
  }

  const onClose = () => {
    dispatch(closeDrawer());
  };

  const onFinish = async(values) => {
    console.log("val=",values)
    if(formValue){
        values._id=formValue._id;
        if(values.ma_truong_phong == formValue.ten_truong_phong){
          values.ma_truong_phong=formValue.ma_truong_phong_id
        }
    }

    await createOrUpdatePhongBan({phongBan:values}).unwrap();
    form.resetFields();
    onClose();
  };
  const optionNhanVienNotTruongPhong = allNhanVienNotTruongPhong?.map(nhanVien=>{
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
          name="ten_phong_ban"
          label="Tên phòng ban"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống tên phòng ban',
            },
          ]}
        >
            <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="ngay_thanh_lap"
          label="Ngày thành lập"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống ngày thành lập phòng ban',
            },
          ]}
        >
            <DatePicker style={{width: '100%'}}/>
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
        <Col span={12}>
        <Form.Item
          name="ma_truong_phong"
          label="Trưởng phòng"
        >
            <Select
                allowClear
                style={{width: '100%'}}
                showSearch
                optionFilterProp="label"
                options={optionNhanVienNotTruongPhong}
            />
        </Form.Item>
        </Col>
        {
          formValue!=undefined? (
            <Col span={12}>
              <Form.Item
                name="so_luong_nhan_vien"a
                label="Số lượng nhân viên"
              >
                  <Input disabled/>
              </Form.Item>
            </Col>
          ):(
            <></>
          )
        }
        
    </Row>
    
    <Space/>


    <Row gutter={16}>
      <Col span={12}>
        <Form.Item wrapperCol={{ offset: 0, span: 2 }}>
          <Button style={{width:"100px"}} type="primary" htmlType="submit">
            Gửi
          </Button>
        </Form.Item>
      </Col>
      
    </Row>
   
  </Form>  
  );
}

export default FormCreatePhongBan;