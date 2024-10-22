import { Routes, Route, useNavigate } from 'react-router-dom';
import routers from './components/router';
import Login from './views/login';
import PrivateRoute from './components/router/privateRoutes';
import { isAuthenticated } from './components/auth';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    if (!isAuthenticated()) {
      // Nếu chưa đăng nhập, chuyển hướng đến trang login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          {routers.map((route, index) => {
            const Element = route.element;
            const roleTarget = route.roleTarget;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute>
                    <Element/>
                  </PrivateRoute>
                }
              />
            );
          })}
        </Routes>
    </div>
  );
}

export default App;
