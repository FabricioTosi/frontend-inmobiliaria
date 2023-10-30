import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Usuarios.css';

const Table = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedusuario, setSelectedusuario] = useState({});
    const [editedusuario, setEditedusuario] = useState({
        nickname: '',
        email: '',
        telefono: '',
    });


    useEffect(() => {
        fetchData();
    }, []);




    const fetchData = () => {
        fetch('http://localhost:8080/api/usuario')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((responseData) => {
                // Accede al campo 'usuarios' dentro de la respuesta
                const usuarios = responseData.usuarios;

                if (Array.isArray(usuarios)) {
                    setData(usuarios);
                } else {
                    console.error('Data is not an array:', usuarios);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/usuario/${id}`, {
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

    const handleEdit = (usuario) => {
        console.log("Selected U suario: ", usuario);
        setSelectedusuario(usuario);
        setEditedusuario({ ...usuario });

        setShowModal(true);
    };
    const handleSave = () => {
        console.log('Datos editados:', editedusuario); // Agregar esta línea para imprimir los datos editados en la consola

        // Convertir 'telefono' a un número
        const telefonoValue = parseFloat(editedusuario.telefono);

        // Verificar si el valor es un número válido
        if (isNaN(telefonoValue)) {
            console.error('El valor de teléfono no es un número válido.');
            return;
        }

        // Actualizar el campo 'telefono' en 'editedusuario' con el valor numérico
        setEditedusuario({ ...editedusuario, telefono: telefonoValue });
        console.log(setEditedusuario);
        fetch(`http://localhost:8080/api/usuario/${selectedusuario.id_usuario}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedusuario),
        })
            .then((response) => {
                console.log(response);
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
            <h1>Usuarios disponibles 👍</h1>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id del usuario</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Mail</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Id de rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((usuario) => (
                            <tr key={usuario.id_usuario}>
                                <td>{usuario.id_usuario}</td>
                                <td>{usuario.nickname}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.telefono}</td>
                                <td>{usuario.rol_id_rol}</td>
                                <td>
                                    <i className="fas fa-trash usuarios-icon-delete" onClick={() => handleDelete(usuario.id_usuario)}></i>
                                    <i className="fas fa-edit usuarios-icon-edit" onClick={() => handleEdit(usuario)}></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/CrearUsuario" className="btn btn-success">Crear Usuario</Link>
                <Link to="/CrearAdmin" className="btn btn-primary">Crear Admin</Link>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editedusuario.nickname}
                                    onChange={(e) => setEditedusuario({ ...editedusuario, nickname: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>


                                <Form.Label>email</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editedusuario.email}
                                    onChange={(e) => setEditedusuario({ ...editedusuario, email: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={editedusuario.telefono}
                                    onChange={(e) => setEditedusuario({ ...editedusuario, telefono: parseInt(e.target.value, 10) })}
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



