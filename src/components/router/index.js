import Home from '../../views/home/index'
import NhanVien from '../../views/nhan_vien'

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
        path: '/nhan_vien1',
        roleTarget: "ALL",
        element: NhanVien
    },
]
export default routers