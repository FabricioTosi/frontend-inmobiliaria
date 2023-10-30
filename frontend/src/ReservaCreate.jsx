import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReservaCreate.css';

function ReservaForm() {
  const navigate = useNavigate();

  const initialState = {
    fecha_reserva: new Date().toISOString().split('T')[0],
    fecha_inicio: '',
    fecha_fin: '',
    usuario_id_usuario: '',
    casa_id_casa: '',
    usuario_rol_id_rol: ''
  };

  const [state, setState] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { fecha_reserva, fecha_inicio, fecha_fin, usuario_id_usuario, usuario_rol_id_rol, casa_id_casa } = state;

    if (fecha_reserva && fecha_inicio && fecha_fin && usuario_id_usuario && usuario_rol_id_rol && casa_id_casa) {
      const reservaData = { ...state };
      console.log(reservaData);
      fetch('http://localhost:8080/reserva', {
        method: 'POST',
        body: JSON.stringify(reservaData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Error al crear la reserva');
        })
        .then((data) => {
          console.log('Reserva creada:', data);
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
    <form onSubmit={handleSubmit} className="form-container">
      {[
        { label: 'Fecha de Reserva', icon: 'fas fa-calendar-alt', name: 'fecha_reserva', type: 'date', readOnly: true },
        { label: 'Fecha de Inicio', icon: 'fas fa-calendar', name: 'fecha_inicio', type: 'date' },
        { label: 'Fecha de Fin', icon: 'fas fa-calendar', name: 'fecha_fin', type: 'date' },
        { label: 'ID de Usuario', icon: 'fas fa-user', name: 'usuario_id_usuario', type: 'text' },
        { label: 'Rol usuario', icon: 'fas fa-user', name: 'usuario_rol_id_rol', type: 'number' },
        { label: 'ID de Casa', icon: 'fas fa-home', name: 'casa_id_casa', type: 'text' },
      ].map((input) => (
        <div className="mb-3" key={input.name}>
          <label className="form-label">
            <i className={input.icon}></i> {input.label}:
          </label>
          <input
            type={input.type}
            name={input.name}
            value={state[input.name]}
            onChange={handleInputChange}
            className="form-control"
            required={!input.readOnly}
            readOnly={input.readOnly}
          />
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        <i className="fas fa-check"></i> Crear Reserva
      </button>
      <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
        <i className="fas fa-arrow-left"></i> Volver a la página principal
      </button>
    </form>
  );
}

export default ReservaForm;
