import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CrearUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            telefono: '',
            nickname: '',
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    redirectToHome = () => {
        // Redirigir al usuario a la página principal ("/")
        window.location.href = '/Login';
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.state.nickname) {
            alert("El campo 'nickname' es obligatorio");
            return;
        }

        const usuarioData = {
            email: this.state.email,
            password: this.state.password,
            telefono: this.state.telefono,
            nickname: this.state.nickname,
        };

        fetch('http://localhost:8080/api/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioData),
        })
            .then((response) => response.json())
            .then((data) => {
                this.redirectToHome();
                toast.success("Usuario creado exitosamente", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                // Redirigir al usuario a la página principal
                this.redirectToHome();

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
                            name="nickname" // Use 'name' instead of 'id'
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
                                name="email" // Use 'name' instead of 'id'
                                placeholder="email Electrónico"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="password">password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password" // Use 'name' instead of 'id'
                                placeholder="password"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                type="text"
                                className="form-control"
                                name="telefono" // Use 'name' instead of 'id'
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
