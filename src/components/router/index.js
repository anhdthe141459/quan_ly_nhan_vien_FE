import Home from '../../views/home/index'
import NhanVien from '../../views/nhan_vien'
import PhongBan from '../../views/phong_ban'
import ChamCong from '../../views/cham_cong'
import BangLuong from '../../views/bang_luong'


const routers = [
    {
        path: '/',
        roleTarget: "ALL",
        element: Home
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
]
export default routers