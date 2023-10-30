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
          const reservaData = {
            fecha_reserva,
            fecha_inicio,
            fecha_fin,
            usuario_id_usuario,
            casa_id_casa
          };
    
          // Realiza la validación a nivel de cliente utilizando la función pasada como propiedad
          if (this.props.isDuplicateReservation(reservaData)) {
            alert('Ya existe una reserva con los mismos datos.');
            return;
          }
    
          // Si no es una reserva duplicada, envía la solicitud al servidor
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
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fecha_reserva">Fecha de Reserva:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fecha_reserva"
                            name="fecha_reserva"
                            value={this.state.fecha_reserva}
                            onChange={this.handleInputChange}
                            required
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fecha_inicio">Fecha de Inicio:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fecha_inicio"
                            name="fecha_inicio"
                            value={this.state.fecha_inicio}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fecha_fin">Fecha de Fin:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fecha_fin"
                            name="fecha_fin"
                            value={this.state.fecha_fin}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="usuario_id_usuario">ID de Usuario:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="usuario_id_usuario"
                            name="usuario_id_usuario"
                            value={this.state.usuario_id_usuario}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="casa_id_casa">ID de Casa:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="casa_id_casa"
                            name="casa_id_casa"
                            value={this.state.casa_id_casa}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Crear Reserva</button>
                </form>
            </div>
        );
    }
}


export default ReservaForm;
