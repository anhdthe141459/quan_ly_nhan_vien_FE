import { Routes, Route } from 'react-router-dom';
import routers from './components/router';

function App() {
  return (
    <div className="App">
        <Routes>
          {routers.map((route, index) => {
            const Element = route.element;
            const roleTarget = route.roleTarget;
            return (
              <Route
                key={index}
                path={route.path}
                element={<Element/>}
              />
            );
          })}
        </Routes>
    </div>
  );
}

export default App;
