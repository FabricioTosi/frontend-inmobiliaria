import React, { useState, useEffect } from "react";

const Reserva = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    let parametros = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    let url = "http://localhost:8080/reserva";
    fetch(url, parametros)
      .then((response) => response.json())
      .then((data) => {
        // Actualiza el estado de las reservas con los datos obtenidos
        setReservas(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []); // El segundo argumento vacío [] asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id del reserva</th>
            <th scope="col">Fecha de la reserva</th>
            <th scope="col">Fecha de inicio</th>
            <th scope="col">Fecha de final</th>
            <th scope="col">Id de la casa</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(reservas) && reservas.length > 0 ? (
            reservas.map((reserva) => (
              <tr key={reserva.id}>
                <th scope="row">{reserva.id}</th>
                <td>{reserva.fecha_reserva}</td>
                <td>{reserva.fecha_inicio}</td>
                <td>{reserva.fecha_fin}</td>
                <td>{reserva.casa_id_casa}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Cargando reservas...</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Reserva;
