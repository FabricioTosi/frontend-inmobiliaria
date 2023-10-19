import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export class InternalLogin extends Component {

  constructor(props) {
    super(props)

    this.state = {
      nickname: '',
      password: ''
    }
  }

  // handler invocado por el evento onSubmit() del formulario, aqui hay dos caminos posibles, un POST para la creacion o un PUT para la edicion
  // eso lo diferenciamos mediante "this.props.params.vehiculo_id", acorde a su existencia debemos cambiar tanto la URL como el METHOD del fetch
  handleSubmit = (event) => {
    event.preventDefault()

    let usuario = {
      nickname: this.state.nickname,
      password: this.state.password
    }

    let parametros = {
      method: 'POST',
      body: JSON.stringify(usuario),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch("http://localhost:8080/Login", parametros)
      .then(res => {
        return res.json()
          .then(body => {
            return {
              status: res.status,
              ok: res.ok,
              headers: res.headers,
              body: body
            };
          })
      }).then(
        result => {
          if (result.ok) {
            sessionStorage.setItem('token', result.body.token)

            toast.success("bienvenido", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            // var tokenDecoded = jwt_decode(result.body.token);

            // if (tokenDecoded.rol === "Agente") {
            //     this.props.navigate("/reservas")
            // } else {
            this.props.navigate("/")
            // }

          } else {
            toast.error(result.body.message, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      ).catch(
        (error) => {
          toast.error(error.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      );
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className='container conFondo'>
        <div className='row'>
          <div className='col'>
            <h1>Iniciar Sesión</h1>
          </div>
        </div>

        <div className='row'>
          <div className='col'>

            <form onSubmit={this.handleSubmit}>


              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="nickname"
                  onChange={this.handleChange}
                  value={this.state.nickname}
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
                  onChange={this.handleChange}
                  value={this.state.password}
                  name='password'
                />

                <label htmlFor="password">Contraseña</label>
              </div>
              <br />

              <input className='btn btn-primary'
                type="submit"
                value="Ingresar"
              />

              <div class="text-center">
                <p>¿No es miembro? <a href="/CrearUsuario">Registrarse</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login



export function Login() {
  const p = useParams();

  const navigate = useNavigate();

  return (
    <>
      <InternalLogin navigate={navigate} params={p} />
    </>
  );
}

// export class login extends Component {
//   render() {
//     return (

//       <form>
//         <br></br>
//         <br></br>
//         <div class="form-outline mb-4">
//           <label class="form-label" for="form2Example1">Correo Electronico</label>
//           <input type="email" id="form2Example1" class="form-control" />
//         </div>


//         <div class="form-outline mb-4">
//           <label class="form-label" for="form2Example2">Contraseña</label>
//           <input type="password" id="form2Example2" class="form-control" />
//         </div>


//         <div class="row mb-4">
//           <div class="col d-flex justify-content-center">

//             <div class="form-check">
//               <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
//               <label class="form-check-label" for="form2Example31"> Recuerdame </label>
//             </div>
//           </div>

//           <div class="col">
//             <a href="#!">¿Olvidó su contraseña?</a>
//           </div>
//         </div>


//         <button type="button" class="btn btn-primary btn-block mb-4">Iniciar sesion</button>


//         <div class="text-center">
//           <p>¿No es miembro? <a href="/CrearUsuario">Registrarse</a></p>
//         </div>
//       </form>
//     )
//   }
// }

// export default login