import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const token = sessionStorage.getItem('token');

const Table = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCasa, setSelectedCasa] = useState({});
  const [editedCasa, setEditedCasa] = useState({});
  const [newCasa, setNewCasa] = useState({
    descripcion: '',
    precio_compra: '',
    superficie: '',
    precio_alquiler: '',
  });

  useEffect(() => {
    console.log("Token:", token); // Imprimir el token en la consola
    fetchData();
  }, [token]);
  
  const fetchData = () => {
    const token = sessionStorage.getItem('token');
    console.log("Token:", token); // Imprimir el token en la consola
    fetchCasaData(token)
      .then((casas) => {
        setData(casas);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  
  const fetchCasaData = (token) => {
    return fetch('http://localhost:8080/casa', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        const casas = responseData.casas;
        if (Array.isArray(casas)) {
          return casas;
        } else {
          console.error('Data is not an array:', casas);
          return [];
        }
      });
  };
  // crear funcion para agregar imagenes
  // const handleImagen

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
    console.log(selectedCasa);
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

  const handleUploadImage = (id_casa) => {
    const url = prompt('Ingrese la URL de la imagen');

    if (url) {
      const imageData = {
        url,
        id_casa,        
      };

      const parametros = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // if (token) {
      //   // Agregar el token al encabezado de la solicitud
      //   parametros.headers = {
      //     ...parametros.headers,
      //     'Authorization': `Bearer ${token}`,
      //   };
      // }

      fetch('http://localhost:8080/api/imagenes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // headers: {
          //   'Authorization': `Bearer ${token}`
          // } // Agregar los encabezados del token
        },
        body: JSON.stringify(imageData),
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            // La URL de la imagen se ha enviado correctamente.
          } else {
            console.error('Error al enviar la URL de la imagen');
          }
        })
        .catch((error) => {
          console.error('Error al enviar la URL de la imagen:', error);
        });
    }
  };

  const handleCreateCasa = () => {
    setNewCasa({
      descripcion: '',
      precio_compra: '',
      superficie: '',
      precio_alquiler: '',
    });
    setShowCreateModal(true); // Mostrar el modal de creación
  };

  const handleSaveNewCasa = () => {
    fetch('http://localhost:8080/casa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Aquí se agrega el token
      },
      body: JSON.stringify(newCasa),
    })
      .then((response) => {
        if (response.ok) {
          // Actualizar los datos después de crear la casa
          fetchData();
          setShowCreateModal(false);
        } else {
          console.error('Network response was not ok');
        }
      })
      .catch((error) => {
        console.error('Error creating casa:', error);
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
                  <button className='btn btn-success' onClick={() => handleUploadImage(casa.id_casa)}>Cargar Imagen</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success" onClick={handleCreateCasa}>
          Crear Casa
        </button>
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

              <Modal.Footer>
                <Button variant="danger" onClick={() => setShowModal(false)}>
                  Cerrar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Editar Casa
                </Button>
              </Modal.Footer>

            </Form>
          </Modal.Body>
        </Modal>
        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Casa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  value={newCasa.descripcion}
                  onChange={(e) => setNewCasa({ ...newCasa, descripcion: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Precio Compra</Form.Label>
                <Form.Control
                  type="number"
                  value={newCasa.precio_compra}
                  onChange={(e) => setNewCasa({ ...newCasa, precio_compra: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Superficie</Form.Label>
                <Form.Control
                  type="number"
                  value={newCasa.superficie}
                  onChange={(e) => setNewCasa({ ...newCasa, superficie: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Precio Alquiler</Form.Label>
                <Form.Control
                  type="number"
                  value={newCasa.precio_alquiler}
                  onChange={(e) => setNewCasa({ ...newCasa, precio_alquiler: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleSaveNewCasa}>
              Crear Casa
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Table;
