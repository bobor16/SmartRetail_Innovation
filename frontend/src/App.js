import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Pages/Login';
import { RealtimeData } from './components/realtimeData/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Employee from './components/Pages/Employee';
import Customer from './components/Pages/Customer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='employee' element={<Employee />} />
        <Route path='customer' element={<Customer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
