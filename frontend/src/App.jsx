import { ToastContainer } from 'react-toastify';
import { Route, Routes } from "react-router-dom";
import Inicio from './Inicio';
import Login from './Login';
import Menu from './Menu';
import 'react-toastify/dist/ReactToastify.css';
import Table from './Reserva';
import ReservaCreate from './ReservaCreate';
import Casas from './Casas';
import CrearUsuario from './CrearUsuario';
import Usuarios from './Usuarios';
import CrearAdmin from './CrearAdmin';


function App() {
  return (
    <>

      <Menu />
      <ToastContainer />
      <div className='container'>
        <Routes>
          <Route path="/CrearUsuario" element={<CrearUsuario />}></Route>
          <Route path='/CrearAdmin' element={<CrearAdmin />}></Route>
          <Route path="/Casas" element={<Casas />}></Route>
          <Route path="/ReservaCreate" element={<ReservaCreate />}></Route>
          <Route path="/Reserva" element={<Table />}></Route>
          <Route path="/" element={<Inicio lastName="Lucas" />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/Usuarios" element={<Usuarios />}></Route>
        </Routes>

      </div>

    </>
  );
}


export default App