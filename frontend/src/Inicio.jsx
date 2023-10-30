import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = () => {
    const token = sessionStorage.getItem('token');
    fetchCasaData(token)
      .then((casas) => {
        if (Array.isArray(casas)) {
          setData(casas);
        } else {
          console.error('Data is not an array:', casas);
        }
        setLoading(false); // Cambia el estado a "false" cuando los datos se han cargado
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Cambia el estado a "false" en caso de error
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

  return (
    <div className="container">
      {loading ? ( // Mostrar un indicador de carga mientras se obtienen los datos
        <p>Cargando...</p>
      ) : (
        data.map((item, index) => (
          <div className="card" style={{ width: '18rem' }} key={index}>
            <a href={item.link} className="card-img-top" alt="Image">
              <img src={item.image} alt={item.title} /> {/* Use el título para el atributo alt */}
            </a>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.description}</p>
              <a href={item.link} className="btn btn-primary">comprar</a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Table;
