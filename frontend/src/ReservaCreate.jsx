import React, { Component } from 'react';

class ReservaForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fecha_reserva: new Date().toISOString().split('T')[0],
            fecha_inicio: '',
            fecha_fin: '',
            usuario_id_usuario: '',
            casa_id_casa: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    
        const { fecha_reserva, fecha_inicio, fecha_fin, usuario_id_usuario, casa_id_casa } = this.state;
          
        // Verifica que los campos obligatorios no estén vacíos
        if (fecha_reserva && fecha_inicio && fecha_fin && usuario_id_usuario && casa_id_casa) {
            const reservaData = { // Define reservaData aquí
                fecha_reserva,
                fecha_inicio,
                fecha_fin,
                usuario_id_usuario,
                casa_id_casa
            };
    
            fetch('http://localhost:8080/reserva', {
                method: 'POST',
                body: JSON.stringify(reservaData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Reserva creada:', data);
                    // Aquí puedes agregar más lógica, como redireccionar a una página de confirmación.
                })
                .catch((error) => {
                    console.error('Error al crear la reserva:', error);
                });
        } else {
            alert('Por favor, complete todos los campos.');
        }
    };
    

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Fecha de Reserva:</label>
                    <input
                        type="date"
                        name="fecha_reserva"
                        value={this.state.fecha_reserva}
                        onChange={this.handleInputChange}
                        required
                        readOnly
                    />
                </div>

                <div>
                    <label>Fecha de Inicio:</label>
                    <input
                        type="date"
                        name="fecha_inicio"
                        value={this.state.fecha_inicio}
                        onChange={this.handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Fecha de Fin:</label>
                    <input
                        type="date"
                        name="fecha_fin"
                        value={this.state.fecha_fin}
                        onChange={this.handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>ID de Usuario:</label>
                    <input
                        type="text"
                        name="usuario_id_usuario"
                        value={this.state.usuario_id_usuario}
                        onChange={this.handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>ID de Casa:</label>
                    <input
                        type="text"
                        name="casa_id_casa"
                        value={this.state.casa_id_casa}
                        onChange={this.handleInputChange}
                        required
                    />
                </div>

                <button type="submit">Crear Reserva</button>
            </form>
        );
    }
}

export default ReservaForm;
