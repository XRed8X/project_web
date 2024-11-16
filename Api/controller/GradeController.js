import { GradeModel, GradesModel } from '../models/GradeModel.js';
import { TeamModel } from '../models/TeamModel.js';
import { EventModel } from '../models/EventsModel.js';

export const createGrade = async (req, res) => {
    try {
        const id_team = req.params.id_team;
        const team = await TeamModel.findById(id_team);

        if(!group) {
            return res.status(400).json({msg:'Grupo no encontrado'})
        }

        // Validar que la ronda no exista
        const round = req.body.round
        if (!round) {
            return res.status(400).json({ msg: 'Ronda no encontrada' })
        }

        const id_event = req.body.id_event;
        const event = await EventModel.findById(id_event);
        if(!event) {
            return res.status(400).json({msg:'Evento no encontrado'})
        }

        // Validar que el equipo este registrado al evento
        if (event.groups.includes(group._id)) {
            return res.status(400).json({msg:'No hay relacion entre el evento y el grupo'})
        }

        // Validar que la calificacion no exista
        const gradeFromDb = await GradesModel.findOne({id_event: event._id, round: round, id_group: group._id});
        gradeFromDb.grades.filter((grade) => {
            
        })


    } catch (err) {

    }
}