import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";

export const Login = () => {
    return (
        <>
            <Container
                fluid
                className="d-flex justify-content-center align-items-center vh-100"
            >
                <Card style={{ width: '28rem' }}>
                    <Card.Body>
                        <Card.Title className="text-center">
                            ¡Bienvenido! Inicia Sesión
                        </Card.Title>
                        <Row className="mt-3">
                            <Col>
                                <Form.Control
                                    type="email"
                                    placeholder="Correo electrónico"
                                    className="mb-3"
                                />
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    className="mb-3"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col className="d-grid">
                                <Button type="submit" style={{ backgroundColor: "#e63946", borderColor: "#e63946",}} >Ingresar</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                ¿Olvidaste tu contraseña? Recuperala{' '}
                                <a href="#" style={{ color: "#e63946" }}>aquí</a>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center mt-2">
                                ¿No tienes cuenta? Regístrate{' '}
                                <a href="#" style={{ color: "#e63946" }}>aquí</a>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};
