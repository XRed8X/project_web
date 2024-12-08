import { Container } from "react-bootstrap"
import { ShowList } from "../components/ShowList"

export const ListUsers = () => {
    return (
        <Container>
            <h1>Listado de usuarios</h1>
            <ShowList entity="user" />
        </Container>
    )
}