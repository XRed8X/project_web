// Crear evento
// Acrualizar
// Cambiar status
// CAmbiar ronda (Eliminar equipos)

import { EventModel } from "../models/EventsModel.js";

export const createEvent = async (req, res) => {
    try {

         if (!Array.isArray(req.body.metrics) || req.body.metrics.length === 0) {
             return res.status(400).json({message: "Debe enviar un arreglo de métricas"})
         }

        // Validacion de que descripcion y max_points exista
        const incompleteMetrics = req.body.metrics.filter(metric => (!metric.description) || (!metric.max_points));
        if (incompleteMetrics.length > 0) {
            return res.status(400).json({message: "Debe enviar descripciones y puntos máximos para todas las métricas", incompleteMetrics})
        }

        // Validar que descripcion si sea string
        const invalidMetrics = req.body.metrics.filter(metric => metric.description.length === 0 || metric.max_points === 0)
        if (invalidMetrics.length > 0) {
            return res.status(400).json({message: "Metricas invalidas", invalidMetrics})
        }

        // Validacion de que la metrica no tiene puntos negativos
        const negativePointsMetrics = req.body.metrics.filter(metric => metric.max_points < 0);
        if (negativePointsMetrics.length > 0) {
            return res.status(400).json({message: "Los puntos máximos deben ser positivos", negativePointsMetrics})
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