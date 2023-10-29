import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';

const Table = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState({});
  const [editedReserva, setEditedReserva] = useState({});
  const [newReserva, setNewReserva] = useState({
    fecha_reserva: new Date().toISOString().split('T')[0],}); // Nuevo estado para la reserva a crear

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

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/reserva/${id}`, {
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
    setEditedReserva({ ...reserva });
    setShowModal(true);
  };

  const handleSave = () => {
    fetch(`http://localhost:8080/reserva/${selectedReserva.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedReserva),
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
  };

  const handleCreate = () => {
    // Envía los datos de la nueva reserva al servidor (ajusta la URL y los datos según tu API)
    fetch('http://localhost:8080/reserva', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReserva),
    })
      .then((response) => {
        if (response.ok) {
          fetchData();
          setShowModal(false);
          // Restablece el estado del nuevo reserva con la fecha actual
          // setNewReserva({ fecha_reserva: new Date().toISOString().split('T')[0] });
        } else {
          console.error('Network response was not ok');
        }
      })
      .catch((error) => {
        console.error('Error creating data:', error);
      });
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
                  <button className='btn btn-danger' onClick={() => handleDelete(reserva.id)}>Eliminar</button>
                  <button className='btn btn-primary' onClick={() => handleEdit(reserva)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/ReservaCreate" className="btn btn-success">Crear Reserva</Link>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Fecha de reserva</Form.Label>
                <Form.Control
                  type="date"
                  value={newReserva.fecha_reserva}
                  onChange={(e) => setNewReserva({ ...newReserva, fecha_reserva: e.target.value })}
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha de inicio</Form.Label>
                <Form.Control
                  type="date"
                  value={newReserva.fecha_inicio}
                  onChange={(e) => setNewReserva({ ...newReserva, fecha_inicio: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha de final</Form.Label>
                <Form.Control
                  type="date"
                  value={newReserva.fecha_fin}
                  onChange={(e) => setNewReserva({ ...newReserva, fecha_fin: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Id de la casa</Form.Label>
                <Form.Control
                  type="text"
                  value={newReserva.casa_id_casa}
                  onChange={(e) => setNewReserva({ ...newReserva, casa_id_casa: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              Guardar Reserva
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Table;
