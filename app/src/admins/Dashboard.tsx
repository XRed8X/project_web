import { Container,Row, Col, Card } from "react-bootstrap";
import { Calendar2Fill, MicrosoftTeams, PeopleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";


export const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4" style={{ color: '#960018', fontWeight: 'bold' }}>
                Panel de Control
            </h1>
            <Row className="g-4">
                <Col>
                    <Card
                        onClick={() => navigate('/user/list')}
                        style={{ cursor: 'pointer', border: '2px solid #960018' }}
                        className="card-hover"
                    >
                        <Card.Body>
                            <Card.Title style={{ color: '#960018', fontWeight: 'bold' }}>Usuarios:</Card.Title>
                            <Card.Text className="d-flex align-items-center justify-content-center">
                                <PeopleFill size={32} style={{ marginRight: '10px', color: '#960018' }} />
                                <span style={{ fontSize: '1.5rem', color: '#960018' }}>10</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card
                        onClick={() => navigate('/team/list')}
                        style={{ cursor: 'pointer', border: '2px solid #960018' }}
                        className="card-hover"
                    >
                        <Card.Body>
                            <Card.Title style={{ color: '#960018', fontWeight: 'bold' }}>Equipos:</Card.Title>
                            <Card.Text className="d-flex align-items-center justify-content-center">
                                <MicrosoftTeams size={32} style={{ marginRight: '10px', color: '#960018' }} />
                                <span style={{ fontSize: '1.5rem', color: '#960018' }}>10</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card
                        onClick={() => navigate('/event/list')}
                        style={{ cursor: 'pointer', border: '2px solid #960018' }}
                        className="card-hover"
                    >
                        <Card.Body>
                            <Card.Title style={{ color: '#960018', fontWeight: 'bold' }}>Eventos:</Card.Title>
                            <Card.Text className="d-flex align-items-center justify-content-center">
                                <Calendar2Fill size={32} style={{ marginRight: '10px', color: '#960018' }} />
                                <span style={{ fontSize: '1.5rem', color: '#960018' }}>10</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}