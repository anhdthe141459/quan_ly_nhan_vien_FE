import React, { useEffect, useState, useCallback } from "react";
import {
  Space,
  Button,
  Popconfirm,
  Form,
  Col,
  Row,
  Input,
  Select,
  Table,
  DatePicker,
  TimePicker,
  message,
  Spin,
} from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  useDownloadExcelLuongTheoThangMutation,
  useGetAllTenNhanVienChuaCoBangLuongQuery,
  useGetLuongNhanVienTheoThangQuery,
  useLazyDownloadExcelLuongTheoThangQuery,
} from "../../../../services/bangLuongApis";
import { useGetAllTenPhongBanQuery } from "../../../../services/phongBanApis";

const { Option } = Select;

const ThongKeLuongNhanVienContent = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const currentDate = dayjs();

  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.month() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.year());
  const {
    data: luongNhanVienTheoThang,
    isLoading: luongNhanVienTheoThangIsLoading,
    isFetching: luongNhanVienTheoThangIsLFetching,
  } = useGetLuongNhanVienTheoThangQuery([selectedYear, selectedMonth], {
    refetchOnMountOrArgChange: true,
  });
  const [
    triggerDownload,
    {
      isLoading: downloadExcelThongKeBangLuongIsLoading,
      isFetching: downloadExcelThongKeBangLuongIsFetching,
    },
  ] = useDownloadExcelLuongTheoThangMutation();
  const { data: allTenPhongBan } = useGetAllTenPhongBanQuery();

  const onChangeDatePicker = (date, dateString) => {
    const [year, month] = dateString.split("-");
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  const searchLuongNhanVien = (values) => {
    if (!values.ma_nhan_su && !values.ten_nhan_su && !values.ma_phong_ban) {
      setSearchData(luongNhanVienTheoThang);
    } else {
      const results = luongNhanVienTheoThang.filter((item) => {
        // Kiểm tra từng điều kiện
        return Object.entries(values).every(([key, value]) => {
          if (!value) return true;
          return item[key]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        });
      });
      setSearchData(results);
    }
  };
  const handleClickResetFormSearch = () => {
    form.resetFields();
    setSearchData(luongNhanVienTheoThang);
  };

  const handleClickDownloadExcelBangLuong = async () => {
    await triggerDownload({ bangLuongs: searchData })
      .unwrap()
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "luongNhanVien.xlsx"); // Tên file tải xuống
        document.body.appendChild(link);
        link.click();
        link.remove();
        // Giải phóng bộ nhớ
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error("Error downloading file:", err);
      });
  };

  const optionTenPhongBans = allTenPhongBan?.map((phongBan) => {
    return {
      value: phongBan._id,
      label: phongBan.ten_phong_ban,
    };
  });

  useEffect(() => {
    if (
      // luongNhanVienTheoThangIsLoading ||
      // luongNhanVienTheoThangIsLFetching ||
      downloadExcelThongKeBangLuongIsLoading ||
      downloadExcelThongKeBangLuongIsFetching
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [
    // luongNhanVienTheoThangIsLoading,
    // luongNhanVienTheoThangIsLFetching,
    downloadExcelThongKeBangLuongIsLoading,
    downloadExcelThongKeBangLuongIsFetching,
  ]);

  useEffect(() => {
    if (luongNhanVienTheoThang) {
      setSearchData(luongNhanVienTheoThang); // Cập nhật state khi có dữ liệu mới
    }
  }, [luongNhanVienTheoThang]);

  const columns = [
    {
      title: "Mã số nhân viên",
      dataIndex: "ma_nhan_su",
      key: "ma_nhan_su",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "ten_nhan_su",
      key: "ten_nhan_su",
    },
    {
      title: "Tiền lương cơ bản",
      dataIndex: "tien_luong_co_ban",
      key: "tien_luong_co_ban",
      render: (text) => <p>{`${text?.toLocaleString()} VNĐ`} </p>,
    },
    {
      title: "Tổng số công giờ làm",
      dataIndex: "tongSoCongNhanVien",
      key: "tongSoCongNhanVien",
    },
    {
      title: "Tiền lương thực nhận",
      dataIndex: "tien_luong_thuc_nhan",
      key: "tien_luong_thuc_nhan",
      render: (text) => (
        <p style={{ color: "blue" }}>{`${text?.toLocaleString()} VNĐ`} </p>
      ),
    },
    {
      title: "Ngày trả lương định kỳ",
      dataIndex: "ngay_tra_luong",
      key: "ngay_tra_luong",
    },
  ];

  if (isLoading) {
    return (
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <Spin tip="Loading" size="large" />
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: "40px" }}>
        <h1>
          Thống kê lương của nhân viên
          <div style={{ float: "right" }}>
            <Button
              style={{
                borderColor: "green",
                color: "green",
                marginLeft: "10px",
              }}
              onClick={handleClickDownloadExcelBangLuong}
            >
              Download excel
            </Button>
          </div>
        </h1>
        <div className="search_phong_ban">
          <Form form={form} layout="vertical" onFinish={searchLuongNhanVien}>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item name="ma_nhan_su">
                  <Input placeholder="Mã nhân viên" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="ten_nhan_su">
                  <Input placeholder="Tên nhân viên" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="ma_phong_ban">
                  <Select
                    placeholder="Phòng ban"
                    allowClear
                    style={{ width: "100%" }}
                    showSearch
                    optionFilterProp="label"
                    options={optionTenPhongBans}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item wrapperCol={{ span: 16 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                  >
                    Tìm kiếm
                  </Button>
                  <Button
                    style={{ marginLeft: "20px" }}
                    onClick={handleClickResetFormSearch}
                  >
                    Làm mới
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        Chọn tháng{" "}
        <DatePicker
          onChange={onChangeDatePicker}
          picker="month"
          defaultValue={currentDate}
        />
      </div>
      <Table columns={columns} dataSource={searchData} />
    </div>
  );
};

export default ThongKeLuongNhanVienContent;
