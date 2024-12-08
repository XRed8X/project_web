import React from 'react';
import './App.css';
import { Login } from './components/login';
import { RegisterParticipants } from './participants/RegisterParticipants';
import { CrearEvento } from './admins/CreateEvents'
// import { ShowList } from './components/ShowList';
import { Dashboard } from './admins/Dashboard';
import { ListUsers } from './admins/ListUsers';
import  { CreateTeam } from './participants/CreateTeam';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ListTeams } from './admins/ListTeams';
import { ListEvents } from './admins/ListEvents';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/home",
    element: <Dashboard/>,
  },
  {
    path: "/user/list",
    element: <ListUsers/>,
  },
  {
    path: "/team/list",
    element: <ListTeams/>,
  },
  {
    path: "/event/list",
    element: <ListEvents/>,
  },
  {
    path: "/register-participants",
    element: <RegisterParticipants/>,
  },
  {
    path: "/crear-evento",
    element: <CrearEvento/>,
  },
  {
    path: "/create-team",
    element: <CreateTeam/>,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;