import React, { Component } from 'react'

export class Inicio extends Component {
    render() {
        return (

            <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" href="/Inicio">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Listar">Listar Usuarios</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="/">Disabled</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/Login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Logout</a>
                        </li>
                    </ul>

                </div>
            </nav>

        )
    }
};


export default Inicio