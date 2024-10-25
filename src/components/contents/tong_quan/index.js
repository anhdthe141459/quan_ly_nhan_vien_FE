import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCountNhanVienQuery } from "../../../services/nhanvienApis";
import { useCountPhongBanQuery } from "../../../services/phongBanApis";
import { useGetLuongNhanVienTheoThangQuery } from "../../../services/bangLuongApis";
import dayjs from "dayjs";
import { useGetChamCongMoiThangQuery } from "../../../services/chamCongApis";

const TongQuanContent = () => {
    const navigate = useNavigate();
    const currentDate = dayjs();
    const { data:luongNhanVienTheoThang } = useGetLuongNhanVienTheoThangQuery([currentDate.year(),currentDate.month()+1]);
    const { data:allNhanVienChamCong} = useGetChamCongMoiThangQuery([currentDate.year(),currentDate.month()+1]);
    const { data:countNhanVien} = useCountNhanVienQuery();
    const { data:countPhongBan} = useCountPhongBanQuery();

    const tongLuongNhanVienTrongThang = luongNhanVienTheoThang?.reduce((accumulator, currentItem) => accumulator + currentItem.tien_luong_thuc_nhan, 0);
    const tongSoCongNhanVien = allNhanVienChamCong?.reduce((accumulator, currentItem) => accumulator + (currentItem.tongSoGioLamViecChinhThuc+currentItem.tongSoGioLamThem), 0);
    const gioLamTrungBinhMoiThangCuaNhanVien = tongSoCongNhanVien/countNhanVien;
    const hours = Math.floor(gioLamTrungBinhMoiThangCuaNhanVien);
    const minutes = Math.round((gioLamTrungBinhMoiThangCuaNhanVien - hours) * 60);

    return(
        <>
            <div style={{marginBottom:"60px"}}>
                <h1>Tổng quan hệ thống</h1>
            </div>
            <div>
                <Row>
                    <Col span={6 } style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card
                            title="Danh sách nhân viên"
                            hoverable
                            style={{ width: 300 }}
                            cover={<img src="/images/employee.jpg" alt="My Image" />}
                            onClick={() => navigate('/nhan_vien')}
                        >
                            <Meta title= {<span style={{ fontSize: '32px',color:"blue" }}>{countNhanVien}</span>} description="Nhân viên" />
                        </Card>
                    </Col>
                    <Col span={6 } style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card
                            title="Danh sách phòng ban"
                            hoverable
                            style={{ width: 300 }}
                            onClick={() => navigate('/phong_ban')}
                            cover={<img src="/images/department.jpg" alt="My Image" />}
                        >
                            <Meta title= {<span style={{ fontSize: '32px',color:"blue" }}>{countPhongBan}</span>} description="Phòng ban" />
                        </Card>
                    </Col>
                    <Col span={6 } style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card
                            title="Thống kê chấm công"
                            hoverable
                            style={{ width: 300 }}
                            onClick={() => navigate('/thong_ke/cham_cong_nhan_vien')}
                            cover={<img src="/images/working-hours.jpg" alt="My Image" />}
                        >
                            <Meta title= {<span style={{ fontSize: '32px',color:"blue"}}>{hours}h {minutes}p</span>} description="Số giờ làm việc trung bình của nhân viên trong tháng này" />
                        </Card>
                    </Col>
                    <Col span={6 } style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card
                            title="Thống kê lương"
                            hoverable
                            style={{ width: 300 }}
                            onClick={() => navigate('/thong_ke/luong_nhan_vien')}
                            cover={<img src="/images/salary.jpg" alt="My Image" />}
                        >
                            <Meta title= {<span style={{ fontSize: '32px',color:"blue" }}>{tongLuongNhanVienTrongThang?.toLocaleString()} VND</span>} description="Tổng lương của nhân viên trong tháng này" />
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default TongQuanContent