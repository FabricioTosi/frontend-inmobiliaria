import React, { useEffect, useState } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Inicio.css';

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [rentSuccess, setRentSuccess] = useState(false);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = () => {
    const token = sessionStorage.getItem('token');
    fetchCasaData(token)
      .then(async (casas) => {
        if (Array.isArray(casas)) {
          const casasWithImages = await fetchCasaImages(casas);
          setData(casasWithImages);
        } else {
          console.error('Data is not an array:', casas);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
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
          throw Error('Network response was not ok');
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

  const handlePurchase = (casaId) => {
    const updatedData = data.filter((casa) => casa.id_casa !== casaId);
    setData(updatedData);
    setPurchaseSuccess(true);

    toast.success('¡Compra exitosa! La casa ha sido eliminada.');
  };

  const handleRent = (casaId) => {
    const updatedData = data.filter((casa) => casa.id_casa !== casaId);
    setData(updatedData);
    setRentSuccess(true);

    toast.success('¡Alquiler exitoso! La casa ha sido ocupada.');
  };

  const fetchCasaImages = async (casas) => {
    const casasWithImages = [];
    for (const casa of casas) {
      const images = await fetchCasaImagesById(casa.id_casa);
      casasWithImages.push({
        ...casa,
        images: images,
      });
    }
    return casasWithImages;
  };

  const fetchCasaImagesById = (casaId) => {
    return fetch(`http://localhost:8080/api/imagenes${casaId}`)
      .then((response) => {
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        return responseData.images;
      })
      .catch((error) => {
        console.error(`Error fetching images for casa ID ${casaId}:`, error);
        return [];
      });
  };

  return (
    <>
      <h1 className="inicio-text">Catálogo de Propiedades</h1>
      <Container className="inicio-container">
        {loading ? (
          <p className="inicio-text">Cargando...</p>
        ) : (
          data.map((casa) => (
            <Card key={casa.id_casa} className="inicio-card">
              {casa.images && casa.images.length > 0 && (
                <img src={casa.images[0].url} alt={casa.descripcion} className="inicio-img" />
              )}
              <Card.Body>
                <Card.Title className="inicio-text">{casa.descripcion}</Card.Title>
                <Card.Text className="inicio-text">
                  Precio de Compra: {casa.precio_compra}
                  <br />
                  Precio de Alquiler: {casa.precio_alquiler}
                  <br />
                  Superficie: {casa.superficie}
                </Card.Text>
                <Button onClick={() => handlePurchase(casa.id_casa)} variant="primary">
                  Comprar
                </Button>
                <Button onClick={() => handleRent(casa.id_casa)} variant="success">
                  Alquilar
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
        {purchaseSuccess && (
          <p className="compra-exitosa"></p>
        )}
        {rentSuccess && (
          <p className="alquiler-exitoso"></p>
        )}
      </Container>
    </>
  );
};

export default Table;
