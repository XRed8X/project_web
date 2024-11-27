import React, { useState } from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';

export const CrearEvento = () => {
  const [metrics, setMetrics] = useState([{ descripcion: '', maximoPuntos: '' }]);

  const addMetric = () => {
    setMetrics([...metrics, { descripcion: '', maximoPuntos: '' }]);
  };

  const removeMetric = () => {
    if (metrics.length > 1) {
      const updatedMetrics = metrics.slice(0, -1);
      setMetrics(updatedMetrics);
    }
  };


  const handleSubmit = () => {
    console.log('Formulario enviado:', metrics);
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <Card style={{ width: '28rem', margin: 'auto' }}>
        <Card.Body>
          <Card.Title className="text-center">Crear Evento</Card.Title>

          <Row className="mt-3">
            <Col>
              <Form.Control
                type="text"
                placeholder="Titulo"
                className="mb-3"
              />
              <Form.Control
                type="number"
                placeholder="Maximo de rondas"
                className="mb-3"
              />

            <p className="fw-bold">Métricas</p>

              {metrics.map((metric, index) => (
                <Row key={index} className="mb-2">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Descripcion"
                      value={metric.descripcion}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Maximo de puntos"
                      value={metric.maximoPuntos}
                    />
                  </Col>
                </Row>
              ))}

              <Row className="mb-3">
                <Col className="d-grid">
                  <Button
                    style={{ backgroundColor: "#404040 ", borderColor: "#404040 ",}}
                    onClick={addMetric}
                  >
                    Agregar metrica
                  </Button>
                </Col>
                <Col className="d-grid">
                  <Button
                    variant="danger"
                    onClick={removeMetric}
                    disabled={metrics.length === 1}
                  >
                    Eliminar metrica
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col className="d-grid">
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    style={{ backgroundColor: "#e63946", borderColor: "#e63946",}}
                  >
                    Crear evento
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};
