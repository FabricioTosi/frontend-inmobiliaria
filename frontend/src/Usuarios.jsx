import React, { useState, useEffect } from "react";

const Usuarios = () => {
    const [usuario, setusuario] = useState([]);

    useEffect(() => {
        let parametros = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        let url = "http://localhost:8080/api/usuario";
        fetch(url, parametros)
            .then((response) => response.json())
            .then((data) => {
                // Actualiza el estado de las usuarios con los datos obtenidos
                setusuario(data);
                console.log(data);
            })
            .catch((error) => console.error(error));
    }, []); // El segundo argumento vacío [] asegura que este efecto se ejecute solo una vez al montar el componente

    return (
        <>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id del usuario</th>
                        <th scope="col">Fecha de la usuario</th>
                        <th scope="col">Fecha de inicio</th>
                        <th scope="col">Fecha de final</th>
                        <th scope="col">Id de la casa</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(usuario) && usuario.length > 0 ? (
                        usuario.map((usuarios) => (
                            <tr key={usuarios.id}> {/* Use usuarios.id as the key */}
                                <th scope="row">{usuarios.id}</th>
                                <td>{usuarios.fecha_usuario}</td>
                                <td>{usuarios.fecha_inicio}</td>
                                <td>{usuarios.fecha_fin}</td>
                                <td>{usuarios.casa_id_casa}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Cargando usuarios...</td>
                        </tr>
                    )}

                </tbody>
            </table>
        </>
    );
};

export default Usuarios;
