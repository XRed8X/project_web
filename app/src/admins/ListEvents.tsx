import { Container } from "react-bootstrap"
import { ShowList } from "../components/ShowList"

export const ListEvents = () => {
    return (
        <Container>
            <h1>Listado de eventos</h1>
            <ShowList entity="event" />
        </Container>
    )
}