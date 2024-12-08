import { useState } from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [data, setData] =useState({});
    const navigate = useNavigate()

    const onChange = (e:any) => {
        e.preventDefault()
        const tempoData:any = data;
        tempoData[e.target.name] = e.target.value
        setData(tempoData)
    }

    const onSubmit = async () => {
        try {
            Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome back!',
                icon: 'success',
                confirmButtonText: 'Go to Home',
                }).then(() => {
                    navigate("/home", { replace: true });
                })
            Swal.showLoading();
            await axios.post("http://localhost:4000/user/login", data);
        } catch (err) {
            Swal.fire("Algo salio mal :( ", (err as AxiosError).message, "error");
        }
    }

    return (
        <>
            <Container
                fluid
                className="d-flex justify-content-center align-items-center vh-100"
            >
                <Card style={{ width: "28rem", margin: "auto" }}>
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
                                    name = "email"
                                    onChange = { onChange }
                                />
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    className="mb-3"
                                    name = "password"
                                    onChange = { onChange }
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col className="d-grid">
                                <Button type="submit" style={{ backgroundColor: "#e63946", borderColor: "#e63946",}} onClick = {() => onSubmit()} >Ingresar</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                ¿Olvidaste tu contraseña? Recuperala{' '}
                                <a href="pipi" style={{ color: "#e63946" }}>aquí</a>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center mt-2">
                                ¿No tienes cuenta? Regístrate{' '}
                                <a href="/register-participants" style={{ color: "#e63946" }}>aquí</a>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};
