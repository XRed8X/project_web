// Crear el equipo
// Inscribirse al evento

import { TeamModel } from "../models/TeamModel";

export const createTeam = async (req, res) => {
    try {
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