import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const Table = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCasa, setSelectedCasa] = useState({});
  const [editedCasa, setEditedCasa] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:8080/casa')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        // Accede al campo 'casas' dentro de la respuesta
        const casas = responseData.casas;

        if (Array.isArray(casas)) {
          setData(casas);
        } else {
          console.error('Data is not an array:', casas);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/casa/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Actualizar los datos después de eliminar
          fetchData();
        } else {
          console.error('Network response was not ok');
        }
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  const handleEdit = (casa) => {
    setSelectedCasa(casa);
    setEditedCasa({ ...casa });
    setShowModal(true);
  };

  const handleSave = () => {
    fetch(`http://localhost:8080/casa/${selectedCasa.id_casa}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedCasa),
    })
      .then((response) => {
        if (response.ok) {
          // Actualizar los datos después de editar
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

  return (
    <>
    <h1>CASAS DISPONIBLES 👍</h1>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>id_casa</th>
            <th>descripcion</th>
            <th>precio_compra</th>
            <th>superficie</th>
            <th>precio_alquiler</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((casa) => (
            <tr key={casa.id_casa}>
              <td>{casa.id_casa}</td>
              <td>{casa.descripcion}</td>
              <td>{casa.precio_compra}</td>
              <td>{casa.superficie}</td>
              <td>{casa.precio_alquiler}</td>
              <td>
                <button className='btn btn-danger' onClick={() => handleDelete(casa.id_casa)}>Eliminar</button>
                <button className='btn btn-primary' onClick={() => handleEdit(casa)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Casa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={editedCasa.descripcion}
                onChange={(e) => setEditedCasa({ ...editedCasa, descripcion: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Precio Compra</Form.Label>
              <Form.Control
                type="number"
                value={editedCasa.precio_compra}
                onChange={(e) => setEditedCasa({ ...editedCasa, precio_compra: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Superficie</Form.Label>
              <Form.Control
                type="number"
                value={editedCasa.superficie}
                onChange={(e) => setEditedCasa({ ...editedCasa, superficie: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Precio Alquiler</Form.Label>
              <Form.Control
                type="number"
                value={editedCasa.precio_alquiler}
                onChange={(e) => setEditedCasa({ ...editedCasa, precio_alquiler: e.target.value })}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default Table;
