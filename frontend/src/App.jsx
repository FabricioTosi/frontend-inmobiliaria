import { ToastContainer} from 'react-toastify';
import { Route, Routes} from "react-router-dom";
import Inicio from './Inicio';
import Login from './Login';
import Menu from './Menu';
import 'react-toastify/dist/ReactToastify.css';
import ListarUsuarios from './ListarUsuarios';
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
          <Route path="/ListarUsuarios" element={<ListarUsuarios />}></Route>
          {/* <Route path="/reservas" element={<Reservas />}></Route>
          <Route path="/vehiculos" element={<Vehiculos />}></Route> */}
          <Route path="/login" element={<Login />}></Route>
          {/* <Route path="/texto/:text" element={<Texto />} />
        */}
        </Routes>

      </div>

    </>
  );
}



  // function Texto() {
  //   const { text } = useParams() ;
  //   const [searchParams] = useSearchParams();
  //   const navigate = useNavigate();
  //   let mode = searchParams.get('mode');
  //   return <>
  //     <div className={mode === 'dark' ? 'dark-mode' : ""}>
  //       <h1>Texto: {text}</h1>
  //       <hr />
  //       <h2>parametro pasado despues de ?:  {searchParams.get('sec')}</h2>
  //     </div>
  //     <hr /><hr /><br />
  //     <button onClick={() => navigate(-1)}>← Back</button>
  //     <button onClick={() => navigate('/login')}>Ir a login</button>
  //   </>
  // };



export default App