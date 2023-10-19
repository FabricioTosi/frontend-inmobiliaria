import React, { Component } from 'react';

class CrearUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            Telefono: '',
            nickname: '', // Agregar campo nickname al estado
        };
    }

    handleInputChange = (event) => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        // Validar si el campo nickname está vacío
        if (!this.state.nickname) {
            alert("El campo 'nickname' es obligatorio");
            return;
        }

        // Crear un objeto con los datos del formulario
        const usuarioData = {
            email: this.state.email,
            password: this.state.password,
            Telefono: this.state.Telefono,
            nickname: this.state.nickname,
        };

        // Realizar la solicitud Fetch para enviar los datos al servidor
        fetch('http://localhost:8080/api/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
                console.log('Usuario creado exitosamente:', data);
            })
            .catch((error) => {
                console.error('Error al crear el usuario:', error);
            });
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group col-md-6">
                        <label htmlFor="nickname">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nickname"
                            placeholder="Nombre"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="email">email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="email Electrónico"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="password">password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="password"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="Telefono">Teléfono</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Telefono"
                                placeholder="Teléfono"
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Crear
                        </button>
                    </div>
                </form>
            </>
        );
    }
}

export default CrearUsuario;
