import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReservaForm() {
    const navigate = useNavigate();

    const [state, setState] = useState({
        fecha_reserva: new Date().toISOString().split('T')[0],
        fecha_inicio: '',
        fecha_fin: '',
        usuario_id_usuario: '',
        casa_id_casa: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const { fecha_reserva, fecha_inicio, fecha_fin, usuario_id_usuario, casa_id_casa } = state;

        // Verifica que los campos obligatorios no estén vacíos
        if (fecha_reserva && fecha_inicio && fecha_fin && usuario_id_usuario && casa_id_casa) {
            const reservaData = {
                fecha_reserva,
                fecha_inicio,
                fecha_fin,
                usuario_id_usuario,
                casa_id_casa,
            };

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
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error al crear la reserva:', error);
                });
        } else {
            alert('Por favor, complete todos los campos.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Fecha de Reserva:</label>
                <input
                    type="date"
                    name="fecha_reserva"
                    value={state.fecha_reserva}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    readOnly
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Fecha de Inicio:</label>
                <input
                    type="date"
                    name="fecha_inicio"
                    value={state.fecha_inicio}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Fecha de Fin:</label>
                <input
                    type="date"
                    name="fecha_fin"
                    value={state.fecha_fin}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">ID de Usuario:</label>
                <input
                    type="text"
                    name="usuario_id_usuario"
                    value={state.usuario_id_usuario}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">ID de Casa:</label>
                <input
                    type="text"
                    name="casa_id_casa"
                    value={state.casa_id_casa}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary">Crear Reserva</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Volver a la página principal</button>
        </form>
    );
}

export default ReservaForm;
