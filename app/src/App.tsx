import React from 'react';
import './App.css';
import { Login } from './components/login';
import { RegisterParticipants } from './participants/RegisterParticipants';
import { CrearEvento } from './admins/CreateEvents'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/register-participants",
    element: <RegisterParticipants/>,
  },
  {
    path: "/crear-evento",
    element: <CrearEvento/>,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;