import React, { Component } from 'react'

export class Inicio extends Component {
    render() {
        return (

            <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/ListarUsuarios">Listar</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/Casas">Casas</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link active" href="/">Reserva</a>
                        </li> <li className="nav-item">
                            <a className="nav-link active" href="/">Reserva</a>
                        </li> */}
                    </ul>
                </div>
                <div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/Login">Iniciar Sesión</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Cerrar Seción</a>
                        </li>
                    </ul>

                </div>
            </nav>

        )
    }
};


export default Inicio