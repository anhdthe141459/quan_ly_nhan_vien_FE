import React, { useEffect, useState ,useCallback } from 'react';
import { Space,Button,Popconfirm,Form,Col,Row,Input,Select,Table, DatePicker, TimePicker, message } from 'antd';
import { debounce } from 'lodash';
import dayjs from 'dayjs';
import {
  SearchOutlined
} from '@ant-design/icons';
import { useGetAllNhanVienPhongBanQuery, useGetAllTenPhongBanQuery } from '../../../services/phongBanApis';
import { useCreateChamCongsMutation, useGetChamCongMoiNgayQuery } from '../../../services/chamCongApis';

const { Option } = Select;


const ChamCongContent = () => {
    const [selectedPhongBanId, setSelectedPhongBanId] = useState('all');
    const [debouncedValue, setDebouncedValue] = useState('');
    const [time, setTime] = useState(null); // State để lưu giá trị của TimePicker
    const [disabledTimePicker, setDisabledTimePicker] = useState(false); 
    const handleChangePhongBan = (value) =>{
        setSelectedPhongBanId(value);
    }
    const { data:allNhanVienChamCong, error:allNhanVienChamCongError, isLoading:allNhanVienChamCongIsLoading } = useGetChamCongMoiNgayQuery(selectedPhongBanId);
    const { data:allTenPhongBan, error:allTenPhongBanPhongError, isLoading:allTenPhongBanIsLoading } = useGetAllTenPhongBanQuery('all');
    const [createChamCongs, result] = useCreateChamCongsMutation();
    const formattedDateToday = dayjs().format('DD/MM/YY');
    const optionSelects= allTenPhongBan?.map(phongBan=>{
    return {
        value:phongBan._id,
        label:phongBan.ten_phong_ban
    }
    });
    let optionSelect = optionSelects || [];
    const optionTenPhongBans=[{value:'all',label:"ALL"},...optionSelect]

    const [dataChamCong, setDataChamCong] = useState();
    const handleChangeData = (value, index, column) => {

        const newData = dataChamCong?.map(item => ({ ...item })); 
        debouncedSave(value, index, column,newData)
    };
    const debouncedSave = useCallback(
        debounce((value, index, column,newData) => {
            newData[index][column] = value;
            if(column=='trang_thai' && (value=="nghi_co_phep" || value=="nghi_khong_phep")){
              delete newData[index]['gio_vao'];
              delete newData[index]['gio_ra'];
              delete newData[index]['so_gio_lam_them'];
            }
            setDataChamCong(newData);
        
        }, 100), // Đặt độ trễ 500ms
        []
    );
    const onFinish = async() => {
      try {
        const today = new Date();
        const data= dataChamCong?.map(item => {
            const diffInMinutes=dayjs(item?.gio_ra).diff(dayjs(item?.gio_vao), 'minute');
            const hours = diffInMinutes / 60;
            const minutes = diffInMinutes % 60;
            let so_gio_lam_viec=hours.toFixed(1);
            if(so_gio_lam_viec > 8){
              so_gio_lam_viec = 8;
            }
            return{
                ...item,
                so_gio_lam_viec:so_gio_lam_viec,
                ngay_cham_cong:today.setHours(0, 0, 0, 0),
            }
        });
        delete data['ten_nhan_su'];
        delete data['ma_nhan_su'];
        delete data['ma_phong_ban'];
        console.log("dataaaa=========123",data); 
        await createChamCongs({chamCongs:data}).unwrap();
        message.success('Gửi bảng chấm công thành công');
      } catch (error) {
        message.error('Gửi bảng chấm công thất bại');
      }

    };

  useEffect(() => {
      if (allNhanVienChamCong) {
          setDataChamCong(allNhanVienChamCong);
      }
    }, [allNhanVienChamCong]);

  const columns = [
    {
      title: 'Mã nhân viên',
      dataIndex: 'ma_nhan_su',
      key: 'ma_nhan_su',
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'ten_nhan_su',
      key: 'ten_nhan_su',
    },
    {
      title: 'Giờ vào',
      dataIndex: 'gio_vao',
      key: 'gio_vao',
      render: (_, record,index) => (
        <Space size="middle">
            <TimePicker disabled={(record.trang_thai=="nghi_co_phep" || record.trang_thai=="nghi_khong_phep")?true:false} allowClear={false} onChange={(time, timeString) => handleChangeData(time, index, "gio_vao")} value={dataChamCong[index].gio_vao?dayjs(dataChamCong[index]?.gio_vao):null}/>
        </Space>
      ),
    },
    {
      title: 'Giờ ra',
      dataIndex: 'gio_ra',
      key: 'gio_ra',
      render: (_, record,index) => (
        <Space size="middle">
            <TimePicker disabled={(record.trang_thai=="nghi_co_phep" || record.trang_thai=="nghi_khong_phep")?true:false} allowClear={false} onChange={(time, timeString) => handleChangeData(time, index, "gio_ra")} value={dataChamCong[index].gio_ra?dayjs(dataChamCong[index]?.gio_ra):null}/>
        </Space>
      ),
    },
    {
      title: 'Giờ làm thêm',
      dataIndex: 'so_gio_lam_them',
      key: 'so_gio_lam_them',
      render: (_, record,index) => (
        <Space size="middle">
            <Input disabled={(record.trang_thai=="nghi_co_phep" || record.trang_thai=="nghi_khong_phep")?true:false} onChange={(e) => handleChangeData(e.target.value, index, "so_gio_lam_them")} value={dataChamCong[index].so_gio_lam_them?dataChamCong[index].so_gio_lam_them:null}/>
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_thai',
      key: 'trang_thai',
      render: (_, record,index) => (
        <Space size="middle">
            <Select
                style={{width: '200px'}}
                optionFilterProp="label"
                value={dataChamCong[index].trang_thai?dataChamCong[index].trang_thai:null}
                onChange={(value) => handleChangeData(value, index, "trang_thai")}
                options={[
                    {
                      value: 'co_mat',
                      label: 'Có mặt',
                    },
                    {
                      value: 'nghi_co_phep',
                      label: 'Nghỉ có phép',
                    },
                    {
                      value: 'nghi_khong_phep',
                      label: 'Nghỉ không phép',
                    },
                  ]}
            />
        </Space>
      ),
    },

  ];


  return (
    <div className='container'>
      <div style={{marginBottom:"40px"}}>
        <h1>Quản lý chấm công ngày {formattedDateToday}</h1>
        <div>
        <Select
          style={{width: '200px'}}
          options={optionTenPhongBans}
          onChange={handleChangePhongBan}
          defaultValue={optionTenPhongBans[0].value}
          />
          <div style={{float:"right"}}>
              <Button type='primary' onClick={onFinish}>Gửi chấm công</Button>
          </div>
        </div>
      </div>
      <Table columns={columns} dataSource={dataChamCong}/>
    </div>
  );

}

export default ChamCongContent;