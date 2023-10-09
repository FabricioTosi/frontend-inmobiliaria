import React, { Component } from 'react'

export class login extends Component {
  render() {
    return (

      <form>
        <br></br>
        <br></br>
        <div class="form-outline mb-4">
          <label class="form-label" for="form2Example1">Correo electrónico</label>
          <input type="email" id="form2Example1" class="form-control" />
        </div>


        <div class="form-outline mb-4">
          <label class="form-label" for="form2Example2">Contraseña</label>
          <input type="password" id="form2Example2" class="form-control" />
        </div>


        <div class="row mb-4">
          <div class="col d-flex justify-content-center">

            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
              <label class="form-check-label" for="form2Example31"> Recuerdame </label>
            </div>
          </div>

          <div class="col">
            <a href="#!">¿Olvidó su contraseña?</a>
          </div>
        </div>


        <button type="button" class="btn btn-primary btn-block mb-4">Iniciar sesion</button>


        <div class="text-center">
          <p>¿No es miembro? <a href="/CrearUsuario">Registrarse</a></p>
        </div>
      </form>
    )
  }
}

export default login