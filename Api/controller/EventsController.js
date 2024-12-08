import { EventModel } from "../models/EventsModel.js";
import { TeamModel } from "../models/TeamModel.js";
import { GradesModel } from "../models/GradeModel.js";

// Funcion para validar los datos de eventos
export const validateEvent = async (metrics, name, max_round) => {
    try {
        // Crear data para almacenar los errores
        const data = { isValid: false, msg: "" };

        // Validar que metrics sea un arreglo no vacío
        if (!Array.isArray(metrics) || metrics.length === 0) {
            data.msg = "Debe enviar un arreglo de métricas";
            return data;
        }

        // Validar que cada métrica tenga descripción valida
        const invalidMetrics = metrics.filter(metric => 
            !metric.description || typeof metric.description !== "string"
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

    } catch (err) {
        console.error(err);
        return res.status(500).json({msg: err.message});
    }
}


export const createEvent = async (req, res) => {

    try {
        const { metrics, name, max_round } = req.body;

        // Validación explícita
        if (!name || !max_round) {
            return res.status(400).json({ 
                message: "Los campos `name` y `max_round` son obligatorios."
            });
        }

        const event = {
            name,
            metrics: metrics || [],
            max_round,
            max_points: req.body.max_points || 0
        };

        // Crear evento
        const createdEvent = await EventModel.create(event);
        res.status(201).json({ message: "Evento creado correctamente", event: createdEvent });
        console.log(req.body);


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
        
        const {metrics, name, max_round} = req.body;
        const {isValid, msg} = validateEvent(metrics, name, max_round);

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
        ));
        res.status(200).json({ message: "Evento actualizado correctamente" })

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

        // No se que verga hace esto
        const teamsPerRound = req.body.maxTeams ? req.body.maxTeams :5;

        // Traer las calificaciones de cada grupo (GradesModel)
        const teamGrades = await GradeModel.find({ event_id: idEvent });

        const { groups } = event;
        const teamsWithFinalGrade = [];
        const gradePerMetric = [];

        for (const group of groups) {
            // Calificacion por metrica
            const gradePerGroup = await GradeModel.findOne({ id_event: event._id, id_group: group });

            const { groups } = event;

            // Promediar por metrica
            for (const group of groups) {

                //Calificaciones por grupo 
                const { grades } = await GradesModel.findOne({ id_event: event._id, id_group: group });

                //Promediar por metrica
                const alreadyChecked = [];
                for (const grade of grades) {
                    const filteredGrades = grade.filter(item => {
                       return (grade.id_metric === item.id_metric && !alreadyChecked.includes(grade.id_metric))
                    })
                    console.log(filteredGrades)
                    let gradePerMetric = 0;
                    if (filteredGrades.length > 0) {
                        gradePerMetric = filteredGrades.reduce((a, b) => a.grade + b.grade);
                    }
                    if(!alreadyChecked.includes(grade.id_metric))
                        alreadyChecked.push(filteredGradesh[0].id_metric);
                        gradePerGroup.grades.push({
                            id_metric: grade.id_metric,
                            grade: gradePerMetric / filteredGrades.length
                        });
                }
                console.log(gradePerMetric);
            }
            // Promedio final
            const finalGrade = gradesPerMetric.reduce((a, b) => a.grade + b.grade) / gradesPerMetric.length;
            console.log(finalGrade);
            teamsWithFinalGrade.push({
                id_team:group,
                finalGrade,
                gradePerMetric
            })
        }

        // Ordenar de mayor a menor
        const sortedTeams = teamsWithFinalGrade.sort((a,b) => a - b)
        const passedTeams = sortedTeams.slice(0, teamsPerRound)

        // Actualizar la ronda de los equipos
        for (const team of passedTeams) {
            await TeamModel.findByIdAndUpdate(team.id_team, {
                $set: {
                    round:req.body.round
                }
            });
        }

        // Actualizar el arreglo de los equipos en el evento
        const nextTeams = passedTeams.map((i) => i.id_team);
        await EventModel.findByIdAndUpdate(event._id, {
            $set: {
                groups: nextTeams,
                round:req.body.round
            }
        });

        return res.json({msg:"Ronda cambiada con exito"})

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al cambiar la ronda", details: err.message });
    }

};

export const getEvent = async (req, res) => {
    try {
        const event = await EventModel.find()
        return res.status(200).json(event)
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Error al obtener los eventos", details: err.message});
    }
};