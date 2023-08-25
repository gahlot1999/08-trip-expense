import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './ui/appLayout/AppLayout';
import Home from './pages/home/Home';
import AddTrip from './pages/addTrip/AddTrip';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/add' element={<AddTrip />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
