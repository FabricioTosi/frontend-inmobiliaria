import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import './Reserva.css';

const Table = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [formData, setFormData] = useState({
    fecha_reserva: new Date().toISOString().split('T')[0],
    fecha_inicio: '',
    fecha_fin: '',
    casa_id_casa: '',
    usuario_id_usuario: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:8080/reserva')
      .then((response) => {
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        const reservas = responseData.reservas;
        if (Array.isArray(reservas)) {
          setData(reservas);
        } else {
          console.error('Data is not an array:', reservas);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = (id_reserva) => {
    console.log(id_reserva);
    fetch(`http://localhost:8080/reserva/${id_reserva}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          fetchData();
        } else {
          console.error('Network response was not ok');
        }
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  const handleEdit = (reserva) => {
    setSelectedReserva(reserva);
    setFormData(reserva);
    setShowModal(true);
  };

  const handleSave = () => {
    if (selectedReserva) {
      // Estás editando una reserva existente
      fetch(`http://localhost:8080/reserva/${selectedReserva.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            fetchData();
            setShowModal(false);
          } else {
            console.error('Network response was not ok');
          }
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
    } else {
      // Estás creando una nueva reserva
      fetch('http://localhost:8080/reserva', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            fetchData();
            setShowModal(false);
          } else {
            console.error('Network response was not ok');
          }
        })
        .catch((error) => {
          console.error('Error creating data:', error);
        });
    }
  };

  return (
    <>
      <h1> RESERVAS 🏠</h1>
      <br></br>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id de la reserva</th>
              <th scope="col">Fecha de la reserva</th>
              <th scope="col">Fecha de inicio</th>
              <th scope="col">Fecha de final</th>
              <th scope="col">Id de la casa</th>
              <th scope="col">Id del usuario</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((reserva) => (
              <tr key={reserva.id_reserva}>
                <td>{reserva.id_reserva}</td>
                <td>{new Date(reserva.fecha_reserva).toLocaleDateString()}</td>
                <td>{new Date(reserva.fecha_inicio).toLocaleDateString()}</td>
                <td>{new Date(reserva.fecha_fin).toLocaleDateString()}</td>
                <td>{reserva.casa_id_casa}</td>
                <td>{reserva.usuario_id_usuario}</td>
                <td>
                  <i className="fas fa-trash reservas-icon-delete" onClick={() => handleDelete(reserva.id_reserva)}></i>
                  <i className="fas fa-edit reservas-icon-edit" onClick={() => handleEdit(reserva)}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/ReservaCreate" className="btn btn-success">Crear Reserva</Link>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedReserva ? 'Editar reserva' : 'Crear reserva'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Fecha de reserva</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.fecha_reserva}
                  onChange={(e) => setFormData({ ...formData, fecha_reserva: e.target.value })}
                  readOnly={selectedReserva}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha de inicio</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.fecha_inicio}
                  onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha de final</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.fecha_fin}
                  onChange={(e) => setFormData({ ...formData, fecha_fin: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Id de la casa</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.casa_id_casa}
                  onChange={(e) => setFormData({ ...formData, casa_id_casa: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Id del usuario</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.usuario_id_usuario}
                  onChange={(e) => setFormData({ ...formData, usuario_id_usuario: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Guardar Reserva
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Table;
