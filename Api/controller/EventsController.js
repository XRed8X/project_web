// Crear evento
// Acrualizar
// Cambiar status
// CAmbiar ronda (Eliminar equipos)

import { EventModel } from "../models/EventsModel.js";

// Funcion para validar los datos de eventos
export const validateEvent = async (metrics, name, max_round) => {
    // Crear data para almacenar los errores
    const data = { isValid: false, msg: "" };

    // Validar que metrics sea un arreglo no vacío
    if (!Array.isArray(metrics) || metrics.length === 0) {
        data.msg = "Debe enviar un arreglo de métricas";
        return data;
    }

    // Validar que cada métrica tenga descripción y puntos máximos válidos
    const invalidMetrics = metrics.filter(metric => 
        !metric.description || typeof metric.description !== "string" || 
        metric.max_points === undefined || metric.max_points <= 0
    );

    if (invalidMetrics.length > 0) {
        data.msg = "Cada métrica debe tener una descripción válida y puntos máximos positivos";
        return data;
    }

    // Validar que el nombre del evento no esté vacío
    if (!name || name.trim() === "") {
        data.msg = "El nombre del evento no puede estar vacío";
        return data;
    }

    // Validar que max_round sea un número no negativo
    if (typeof max_round !== "number" || max_round < 0) {
        data.msg = "Las rondas deben ser un número no negativo";
        return data;
    }

    // Validación exitosa
    data.isValid = true;
    return data;
}


export const createEvent = async (req, res) => {

    try {

        const {metrics, name, max_round, max_points} = req.body;
        const {isValid, msg} = validateEvent(metrics, name, max_round, max_points);

        
        if (!isValid) {
            return res.status(400).json({message: msg})
        }
        
        const event = {
            name: req.body.name,
            metrics: req.body.metrics,
            max_round: req.body.max_round,
        };
        await EventModel.create(event)
        res.status(201).json({ message: "Evento creado correctamente", event })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al crear el evento", details: err.message });
    }
}

export const udateEvent = async (req, res) => {
    try {
        const idEvent = req.params.id;
        const event = await EventModel.findById(idEvent);

        if (!event) {
            return res.status(404).json({ message: "El evento no existe" });
        }
        
        const {metrics, name, max_round, max_points} = req.body;
        const {isValid, msg} = validateEvent(metrics, name, max_round, max_points);

        if (!isValid) {
            return res.status(400).json({message: msg})
        }

        await EventModel.findByIdAndUpdate(idEvent, (
            {
                $set: {
                    name,
                    metrics,
                    max_round,
                    max_points,
                }
            }
        ))

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al actualizar el evento", details: err.message });
    }
}

export const setStatus = async (req, res) => {
    try {
        const idEvent = req.params.id;
        const event = await EventModel.findById(idEvent);
        
        if (!event) {
            return res.status(404).json({ message: "El evento no existe" });
        }

        if (!["pending", "active", "donas"].includes(req.body.status.toLowerCase())) {
            return res.status(400).json({ message: "El status debe ser pending, active o donas" });
        }

        await EventModel.findByIdAndUpdate(idEvent,(
            {
                $set: {
                    status: req.body.status
                }
            }
        ))
        
        res.status(200).json({ message: "El evento ha sido actualizado correctamente" })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al actualizar el status", details: err.message });

    }
}

export const changeRound = async (req, res) => {

    try {
        const idEvent = req.params.id;
        const event = await EventModel.findById(idEvent);
        
        if (!event) {
            return res.status(404).json({ message: "El evento no existe" });
        }

        // Traer las calificaciones de cada grupo (GradesModel)
        const teamGrades = await GradeModel.find({ event_id: idEvent });

        // Pro
    } catch (err) {

    }

}