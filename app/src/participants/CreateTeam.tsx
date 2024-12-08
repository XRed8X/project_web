import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

export const CreateTeam = () => {
    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '28rem', margin: 'auto' }}>
                <Card.Body>
                    <Card.Title className="text-center">Crear Equipo</Card.Title>
                    <Form>
                        <Row className="mt-3">
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre del equipo"
                                    name="name"
                                    className="mb-3"
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre del líder"
                                    name="leader"
                                    className="mb-3"
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col className="d-grid">
                                <Button
                                    variant="primary"
                                    style={{ backgroundColor: '#e63946', borderColor: '#e63946' }}
                                >
                                    Crear equipo
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};
