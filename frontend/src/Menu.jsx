import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Menu() {
    const navigate = useNavigate();

    const [token, setToken] = useState("");

    useEffect(() => {
        const t = sessionStorage.getItem('token')
        if (t !== token) {
            setToken(t)
        }
    });

    function logout() {
        sessionStorage.removeItem('token');
        setToken("");
        navigate("/");
    }

    // Obtén la ruta actual
    const currentPath = window.location.pathname;

    // Verifica si estás en la página "/Login"
    const isLoginPage = currentPath === "/Login";

    if (token !== "" && token !== null) {
        // Renderiza el menú cuando el usuario está autenticado
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className='navbar-brand'>Inicio</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/reserva" className='nav-link'>Reservas</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/casas" className='nav-link'>Casas</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Usuarios" className='nav-link'>usuarios</Link>
                            </li>
                        
                        </ul>
                    </div>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container">
                            <div className="btn-group" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                <button className='btn btn-danger rounded-circle ml-2' onClick={() => logout()}>
                                    <span className="material-symbols-outlined">
                                        Logout
                                    </span>
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </nav>
        );
    } else if (!isLoginPage) {
        // Renderiza el menú con los botones de "Login" y "Crear Usuario" cuando no estás en la página "/Login"
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <div className="btn-group" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <Link to="/Login" className='btn btn-primary rounded-circle ml-2'>
                            <span className="material-symbols-outlined">
                                Login
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
        );
    } else {
        return null; // No renderiza nada en la página "/Login"
    }
}

export default Menu;