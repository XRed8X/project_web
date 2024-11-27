import React from 'react';
import './App.css';
import { Login } from './components/login';
import { RegisterParticipants } from './participants/RegisterParticipants';
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
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;