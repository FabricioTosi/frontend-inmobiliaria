import { ToastContainer } from 'react-toastify';
import { Route, Routes } from "react-router-dom";
import Inicio from './Inicio';
import Login from './Login';
import Menu from './Menu';
import 'react-toastify/dist/ReactToastify.css';
import Reserva from './Reserva';
import Casas from './Casas';
import CrearUsuario from './CrearUsuario';


function App() {
  return (
    <>

      <Menu />
      <ToastContainer />
      <div className='container'>
        <Routes>
          <Route path="/CrearUsuario" element={<CrearUsuario />}></Route>
          <Route path="/Casas" element={<Casas />}></Route>
          <Route path="/Reserva" element={<Reserva />}></Route>
          <Route path="/" element={<Inicio lastName="Lucas" />}></Route>
          <Route path="/login" element={<Login />}></Route>
          {/* <Route path="/texto/:text" element={<Texto />} />
        */}
        </Routes>

      </div>

    </>
  );
}


export default App