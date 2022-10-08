import Home from './routes/home/home.component';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';

const Shop = () => {
  return (
    <div>
      <h1>I'm the Shop component!!</h1>
      <Outlet />
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
