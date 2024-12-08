import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { IEvent, ITeam, IUser } from "../types"
import { Columns } from "react-bootstrap-icons"
import { Card, Table, Button } from "react-bootstrap"


interface props {
    entity: "user" | "team" | "event"
}
export const ShowList = ({ entity }: props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData()
      }, []);


    const getData = async () => {
        try {
            const url = `http://localhost:4000/${entity}/list`
            const {data} = await axios.get(url)
            setData(data)
        } catch (err) {
            console.error("Error al obtener los datos", err)
            Swal.fire({
                title: 'Opps, ocurrio un error',
                text: 'No se pudieron obtener los datos de la tabla.',
                icon: 'error',
                confirmButtonText: 'Close',
              });
        }
    }

    const getColumns = () => {
        const userColumns = ["Nombre", "Correo", "CURP", "Rol"]
        const eventColumns = ["Nombre del evento", "Cantidad de rondas"]
        const teamColumns = ["Nombre del quipo", "Nombre del lider"]

        let columns = []
        if(entity === "event") {
            columns = eventColumns
        } else if (entity === "team") {
            columns = teamColumns
        } else {
            columns = userColumns
        }
        const HTMLColumns = columns.map((c) =>
            <th key={c}>{c}</th>
        );
        return HTMLColumns;
    }

    const getName = () => {
        let name = ""
        if(entity === "event") {
            name = "Eventos"
        } else if(entity === "team") {
            name = "Equipos"
        } else {
            name = "Usuarios"
        }
        return name;
    }



    return (
        <Card style={{ border: '2px solid #960018', borderRadius: '10px' }}>
            <Card.Header style={{ backgroundColor: '#960018', color: '#fff', fontWeight: 'bold' }}>
                <Columns size={24} style={{ marginRight: '10px' }} /> {entity}es
            </Card.Header>
            <Table bordered hover style={{ margin: 0 }}>
                <thead>
                    <tr>{getColumns()}</tr>
                </thead>
                <tbody>
                    {entity === 'event' &&
                        data.map((event: any, index: number) => (
                            <tr key={index}>
                                <td>{event.name}</td>
                                <td>{event.max_round}</td>
                            </tr>
                        ))}
                    {entity === 'team' &&
                        data.map((team: any, index: number) => (
                            <tr key={index}>
                                <td>{team.name}</td>
                                <td>{team.leader}</td>
                            </tr>
                        ))}
                    {entity === 'user' &&
                        data.map((user: any, index: number) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.curp}</td>
                                <td>{user.email}</td>
                                <td>{user.rol}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            
        </Card>
    );
    
}