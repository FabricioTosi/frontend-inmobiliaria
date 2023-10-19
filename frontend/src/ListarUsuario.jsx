import React, { Component } from 'react';

class ListarUsuario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: [], // Cambiamos "usuario" a "usuario" para almacenar una lista de usuario
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.cargarDatosusuario();
  }

  cargarDatosusuario = () => {
    this.setState({ isLoading: true });

    fetch("http://localhost:8080/api/usuario", {
      method: "GET" // Usamos el método GET
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            usuario: Array.isArray(result) ? result : [], // Almacenamos la lista de usuario como un array
            isLoading: false,
            
          });
        }
      )
      .catch((error) => {
        this.setState({
          error: error.message,
          isLoading: false,
        });
      });
  };

  render() {
    const { usuario, isLoading, error } = this.state;

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (isLoading) {
      return <p>Cargando datos de usuario...</p>;
    }

    if (!usuario || usuario.length === 0) {
      
      return <p>No se encontraron usuario.</p>;
    }

    const usuarioRows = usuario.map((usuario, index) => (
      <tr key={index}>
        <td>{usuario.nickname}</td>
        <td>{usuario.telefono}</td>
        <td>{usuario.email}</td>
      </tr>
    ));

    return (
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>TELEFONO</th>
              <th>EMAIL</th>
            </tr>
          </thead>
          <tbody>{usuarioRows}</tbody>
        </table>
      </div>
    );
  }
}

export default ListarUsuario;
