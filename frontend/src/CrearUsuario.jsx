import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs';
import './CrearUsuario.css'

class CrearUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            telefono: '',
            nickname: '',
            rol_id_rol: '2',
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

    hashPassword = (password) => {
        // Hashea la contraseña utilizando bcryptjs
        const saltRounds = 10; // Número de saltos
        return bcrypt.hashSync(password, saltRounds);
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.state.nickname) {
            alert("El campo 'nickname' es obligatorio");
            return;
        }

        // Hashea la contraseña antes de enviarla al servidor
        const hashedPassword = this.hashPassword(this.state.password);

        const usuarioData = {
            email: this.state.email,
            password: hashedPassword, // Envía la contraseña hasheada
            telefono: this.state.telefono,
            nickname: this.state.nickname,
            rol_id_rol: 2,
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

                console.log('Usuario creado exitosamente:', data);
            })
            .catch((error) => {
                console.error('Error al crear el usuario:', error);
            });
    }

    render() {
        return (
            <div className="crear-usuario-container"> 
                <form onSubmit={this.handleSubmit} className="crear-usuario-form"> 
                    <div className="form-group crear-usuario-input"> 
                        <label htmlFor="nickname">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nickname"
                            placeholder="Nombre"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group crear-usuario-input">
                            <label htmlFor="email">email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="email Electrónico"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group crear-usuario-input">
                            <label htmlFor="password">password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="password"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group crear-usuario-input">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                type="text"
                                className="form-control"
                                name="telefono"
                                placeholder="Teléfono"
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <button type="submit" className="crear-usuario-button btn btn-primary"> 
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CrearUsuario;
