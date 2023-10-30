import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

function LoginForm({ state, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="nickname"
          onChange={handleChange}
          value={state.nickname}
          name='nickname'
        />
        <label htmlFor="nickname">Usuario</label>
      </div>
      <br />
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="password"
          onChange={handleChange}
          value={state.password}
          name='password'
        />
        <label htmlFor="password">Contraseña</label>
      </div>
      <br />
      <input className='btn btn-primary' type="submit" value="Ingresar" />
      <div className="text-center">
        <p>¿No es miembro? <a href="/CrearUsuario">Registrarse</a></p>
      </div>
    </form>
  );
}

function InternalLogin({ navigate }) {
  const [state, setState] = useState({
    nickname: '',
    password: ''
  });

  const showToast = (message, options = {}) => {
    toast(message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      ...options,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!state.nickname || !state.password) {
      showToast("Por favor, complete todos los campos.", { type: "error" });
      return;
    }

    const usuario = {
      nickname: state.nickname,
      password: state.password
    };

    const parametros = {
      method: 'POST',
      body: JSON.stringify(usuario),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch("http://localhost:8080/Login", parametros)
      .then((res) => {
        return res.json()
          .then((body) => ({
            status: res.status,
            ok: res.ok,
            headers: res.headers,
            body: body
          }));
      })
      .then((result) => {
        if (result.ok) {
          sessionStorage.setItem('token', result.body.token);
          showToast("¡Bienvenido!");
          navigate("/");
        } else {
          showToast(result.body.message, { type: "error" });
        }
      })
      .catch((error) => {
        showToast(error.message, { type: "error" });
      });
  }

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div className='container conFondo'>
      <LoginForm state={state} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}

function Login() {
  const p = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <InternalLogin navigate={navigate} params={p} />
    </>
  );
}

export default Login;
