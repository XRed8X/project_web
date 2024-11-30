import React, { useState } from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
import axios, { AxiosError } from "axios";

interface IMetric {
  description: string;
  max_points: number;
  id: string; // Agrego esto para darle un id a cada metrica
}

interface IEvent {
  name: string;
  max_round: number;
  metrics: IMetric[];
}


export const CrearEvento = () => {
  
  const emptyMetric: IMetric = {
    id: uuidv4(),
    description: '',
    max_points: 0,
  };

  const [event, setEvent] = useState<IEvent>({
    name: '',
    max_round: 0,
    metrics: [emptyMetric],
  });

  const addMetric = () => {
    const newMetric = { ...emptyMetric, id: uuidv4() }; // Nueva métrica con id unico
    setEvent((prevEvent) => ({
      ...prevEvent,
      metrics: [...prevEvent.metrics, newMetric],
    }));
  };

  const removeMetric = (idToRemove: string) => {
    const updatedMetrics = event.metrics.filter((metric) => metric.id !== idToRemove); // Elimino la metrica por id
    setEvent({ ...event, metrics: updatedMetrics });
  };

  const onChangeBasicFields = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const onChangeMetric = (e: React.ChangeEvent<any>, index: number) => {
    const { name, value } = e.target;
    const updatedMetrics = [...event.metrics];
    updatedMetrics[index] = { ...updatedMetrics[index], [name]: value };
    setEvent({ ...event, metrics: updatedMetrics });
  };

  const onSubmit = async () => {
    try {
        Swal.fire("Guardando datos");
        Swal.showLoading();
        
        const requestBody = {
            name: event.name,
            metrics: event.metrics,
            max_round: event.max_round,
        };

        // Hacer la solicitud POST con los datos
        await axios.post("http://localhost:4000/event/create/", requestBody);

        Swal.fire("Datos guardados con éxito", "Success");
        console.log('Evento creado:', requestBody); // Confirmar datos enviados
    } catch (err) {
        Swal.fire("Algo salió mal :( ", (err as AxiosError).message, "error");
        console.error('Error al crear el evento:', err);
    }
};


  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '28rem', margin: 'auto' }}>
        <Card.Body>
          <Card.Title className="text-center">Crear Evento</Card.Title>
          <Form>
            <Row className="mt-3">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Nombre del evento"
                  name="name"
                  // value={event.title}
                  onChange={onChangeBasicFields}
                  className="mb-3"
                />
                <Form.Control
                  type="number"
                  placeholder="Máximo de rondas"
                  name="max_round"
                  // value={event.max_round}
                  onChange={onChangeBasicFields}
                  className="mb-3"
                />

                <p className="fw-bold">Métricas</p>
                {event.metrics.map((metric, index) => (
                  <Row key={metric.id} className="mb-2">
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Descripción"
                        name="description"
                        value={metric.description}
                        onChange={(e) => onChangeMetric(e, index)}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder="Máximo de puntos"
                        name="max_points"
                        // value={metric.max_points}
                        onChange={(e) => onChangeMetric(e, index)}
                      />
                    </Col>
                    <Col>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeMetric(metric.id)}
                        disabled={event.metrics.length === 1}
                      >
                        <Trash size={24} />
                      </Button>
                    </Col>
                  </Row>
                ))}

                <Row className="mb-3">
                  <Col className="d-grid">
                    <Button
                      style={{ backgroundColor: '#404040', borderColor: '#404040' }}
                      onClick={addMetric}
                    >
                      Agregar métrica
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col className="d-grid">
                    <Button
                      variant="primary"
                      onClick={onSubmit}
                      style={{ backgroundColor: '#e63946', borderColor: '#e63946' }}
                    >
                      Crear evento
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
