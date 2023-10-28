
import React, { Component } from 'react';

class Reserva extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fecha_reserva: this.getCurrentDate(),
            nickname: '',
            password: '',
            usuario_id_usuario: 0, // Agregar usuario_id_usuario al estado
            reserva: {
                fecha_reserva: '',
                fecha_inicio: '',
                fecha_fin: '',
                usuario_id_usuario: 0,
                casa_id_casa: 0,
            }
        };
    }

    getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    sendReservaData() {
        const { reserva } = this.state;

        let parametros = {
            method: 'POST',
            body: JSON.stringify(reserva),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,
            },
        };

        fetch('http://localhost:8080/reserva', parametros)
            .then(response => {
                return response.json()
                    .then(data => {
                        return {
                            status: response.status,
                            ok: response.ok,
                            headers: response.headers,
                            data: data
                        };
                    })
            })
            .then(result => {
                if (result.ok) {
                    console.log('Reserva creada exitosamente:', result.data);
                } else {
                    console.error('Error al crear la reserva:', result.data.message);
                }
            })
            .catch(error => {
                console.error('Error al crear la reserva:', error.message);
            });
    }

     handleSubmit = (event) => {
        event.preventDefault();

        const { nickname, password } = this.state;

        const usuarioData = {
            nickname: nickname,
            password: password
        };

        const parametros = {
            method: 'POST',
            body: JSON.stringify(usuarioData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,
            },
        };

        fetch('http://localhost:8080/Login', parametros)
            .then((response) => response.json())
            .then((userData) => {
                if (userData && userData.id_usuario) {
                    this.setState({ usuario_id_usuario: userData.id_usuario }, () => {
                        this.sendReservaData();
                    });
                } else {
                    alert("La respuesta no es un JSON válido.");
                }
            })
            .catch((error) => {
                console.error('Error al obtener el ID del usuario:', error);
            });
    }
    
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group col-md-6">
                        <label htmlFor="fecha_reserva">Fecha de Reserva</label>
                        <input
                            type="date"
                            className="form-control"
                            name="fecha_reserva"
                            value={this.state.fecha_reserva}
                            readOnly // Evitar que el usuario cambie la fecha
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="fecha_inicio">Fecha de Inicio</label>
                        <input
                            type="date"
                            className="form-control"
                            name="fecha_inicio"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="fecha_fin">Fecha de Fin</label>
                        <input
                            type="date"
                            className="form-control"
                            name="fecha_fin"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="casa_id_casa">ID de Casa</label>
                        <input
                            type="text"
                            className="form-control"
                            name="casa_id_casa"
                            placeholder="ID de Casa"
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="nickname">Nickname</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nickname"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Crear Reserva
                    </button>
                </form>
            </>
        );
    }
}

export default Reserva;
