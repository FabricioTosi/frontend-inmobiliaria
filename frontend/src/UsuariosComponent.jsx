// import React from 'react';
// import { useFetch } from '../hooks/useFetch';

// export const UsuariosComponent = () => {
//   const { data, isLoading, err } = useFetch('http://localhost:8080/api/usuario');

//   if (isLoading) {
//     return <h4>Cargando...</h4>;
//   }

//   if (err) {
//     return <p>Ha ocurrido un error: {err.toString()}</p>;
//   }

//   if (!Array.isArray(data)) {
//     return <p>Los datos no son un array.</p>;
//   }

//   return (
//     <>
//       <h1>Lista de users</h1>
//       {renderUserTable(data)}
//     </>
//   );
// };

// function renderUserTable(data) {
//     console.log(data);
//   return (
//     <table className="table table-dark">
//       <thead>
//         <tr>
//           <th scope="col">Id</th>
//           <th scope="col">Nombre</th>
//           <th scope="col">Email</th>
//           <th scope="col">Telefono</th>
//           <th scope="col">Rol</th>
//         </tr>
//       </thead>
//       <tbody>
       
//       {data.map(usuario =>  {
//     return(
//         <> <tr key={usuario.id_usuario}>
//         <th scope="row">{usuario.id_usuario}</th>
//         <td>{usuario.nickname}</td>
//         <td>{usuario.email}</td> 
//         <td>{usuario.telefono}</td>
//         <td>{usuario.rol_id_rol}</td>
//       </tr></>
//     )
// })}
//       </tbody>
//     </table>
//   );
// }

