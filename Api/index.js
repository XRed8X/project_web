import express from 'express';
import  cors from 'cors';
import helmet from 'helmet'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { register, login, updateProfile } from './controller/UsersController.js';
import { createEvent } from './controller/EventsController.js';
import { createTeam } from './controller/TeamsController.js';
import { getUsers } from './controller/UsersController.js';
import { getEvent } from './controller/EventsController.js';
import { getTeam } from './controller/TeamsController.js'; 

dotenv.config()

const app = express();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Conectado a la base de datos')) // Si conecta nos muestra este mensaje
.catch((err) => console.log(err)) // Si no conecta nos muestra el error

app.use(cors())
app.use(helmet())
app.use(express.json());

app.get("/", (req, res) => res.send("Mayo Server"))

// Rutas de usuarios
app.post("/user/register", register)
app.post("/user/login", login)
app.put("/user/update-profile/:_id", updateProfile)
app.get("/user/list", getUsers)

// Rutas de eventos
app.post("/event/create/", createEvent)
app.get("/event/list", getEvent)

//Rutas de teams
app.post("/teams/create", createTeam)
app.get("/team/list", getTeam)

app.listen(4000, ()=>console.log("Server is running"))