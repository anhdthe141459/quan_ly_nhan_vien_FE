import Home from '../../views/home/index'
import NhanVien from '../../views/nhan_vien'
import PhongBan from '../../views/phong_ban'


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
]
export default routers