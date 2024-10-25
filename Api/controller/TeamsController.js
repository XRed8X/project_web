// Crear el equipo
// Inscribirse al evento

import { TeamModel } from "../models/TeamModel";

export const createTeam = async (req, res) => {
    try {

        // Validar que el nombre del equipo contenga solo caracteres alfanumericos (el unico caracter especial permitido es "-")
        const regex = /^[a-zA-Z0-9-]+$/;
        if (!regex.test(req.body.name)) {
            return res.status(400).json({message: "El nombre del equipo solo puede contener caracteres alfanumericos"})
        }

        // Validar una longitud minima y maxima para el nombre del equipo
        if (req.body.name.length < 3 || req.body.name.length > 15) {
            return res.status(400).json({message: "El nombre del equipo debe tener entre 3 y 15 caracteres"})
        }

        // Validar que los miembros sea un tipo de dato entero
        if(!Array.isArray(req.body.members) || !req.body.members.every(id => typeof id === "number")) {
            return res.status(400).json({message: "Los miembros deben ser un arreglo de enteros"})
        }

        // Validar que el equipo no exeda los 8 participantes
        if (req.body.members.length > 8) {
            return res.status(400).json({message: "El equipo no debe de exeder los 8 participantes"})
        }

        const team = {
            name: req.body.name,
            id_members: req.body.members,
            leader: req.body.leader
        }
        await TeamModel.create(team)
        return res.status(201).json({message: "Equipo creado correctamente"})
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "Hubo un error al crear el equipo"})
    }
}

export const registerEvent = async (req, res) => {

    // Validar que el evento exista
    const idEvent = req.params.id;
    const event = await EventModel.findById(idEvent);
    if (!event) {
        return res.status(400).json({message: "El evento no existe"})
    }

    try {
        const idTeam = req.params.id;
        const team = await TeamModel.findById(idTeam);
        if (!team) {
            return res.status(404).json({message: "El grupo no existe"})
        }

        const idEvent = req.params.idEvent;
        const event = await EventModel.findById(idEvent);
        if (!event) {
            return res.status(404).json({message: "El evento al que intentas registrarte no existe"})
        }

        // Registrar al equipo al evento
        await EventModel.findByIdAndUpdate(idEvent, {
            $push: {
                "teams": idTeam
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "Hubo un error al inscribirse al evento"})
    }
}