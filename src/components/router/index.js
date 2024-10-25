import Home from '../../views/home/index'
import NhanVien from '../../views/nhan_vien'
import PhongBan from '../../views/phong_ban'
import ChamCong from '../../views/cham_cong'
import BangLuong from '../../views/bang_luong'
import ThongKeChamCongNhanVien from '../../views/thong_ke/thong_ke_cham_cong_nhan_vien'
import ChiTietChamCongNhanVien from '../../views/thong_ke/thong_ke_cham_cong_nhan_vien/chi_tiet_cham_cong_nhan_vien'
import ThongKeLuongNhanVien from '../../views/thong_ke/thong_ke_luong_nhan_vien'
import TongQuan from '../../views/tong_quan'
import Login from '../../views/login'


const routers = [
    {
        path: '/tong_quan',
        roleTarget: "ALL",
        element: TongQuan
    },
    {
        path: '/nhan_vien',
        roleTarget: "ALL",
        element: NhanVien
    },
    {
        path: '/phong_ban',
        roleTarget: "ALL",
        element: PhongBan
    },
    {
        path: '/cham_cong',
        roleTarget: "ALL",
        element: ChamCong
    },
    {
        path: '/bang_luong',
        roleTarget: "ALL",
        element: BangLuong
    },
    {
        path: '/thong_ke/cham_cong_nhan_vien',
        roleTarget: "ALL",
        element: ThongKeChamCongNhanVien
    },
    {
        path: '/thong_ke/cham_cong_nhan_vien/:id',
        roleTarget: "ALL",
        element: ChiTietChamCongNhanVien
    },
    {
        path: '/thong_ke/luong_nhan_vien/',
        roleTarget: "ALL",
        element: ThongKeLuongNhanVien
    },
]
export default routers