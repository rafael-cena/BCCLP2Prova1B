import { useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Row, Col, Table, Form } from "react-bootstrap";

export default function DetalhesCandidato(props) {
    const [validated, setFormValidated] = useState(false);
    const [questionamentos, setQuestionamentos] = useState(props.candidatoSelecionado.questionamentos);
    const [formQuest, setFormQuest] = useState(false);
    let duvida = '';

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            setQuestionamentos([...questionamentos, duvida]);
        }
        else {
            setFormValidated(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Container>
            <h1 className="text-center">Detalhes Candidato</h1>
            <hr /><br />

            <Row style={{ marginBottom: '20px' }}>
                <Col md={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={props.candidatoSelecionado.avatar} alt="Foto do candidato"
                        style={{ width: '500px', borderRadius: '10px', boxShadow: '0 0 10px #101720' }} />
                </Col>
                <Col md={6} style={{ fontSize: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Nome: <span style={{ fontSize: '50px' }}>{props.candidatoSelecionado.nome}</span></p>
                    <p>Email: {props.candidatoSelecionado.email}</p>
                    <p>Curtidas: {props.candidatoSelecionado.curtidas}</p>
                    <p>Descurtidas: {props.candidatoSelecionado.descurtidas}</p>
                </Col>
            </Row>

            <Table striped bordered hover>
                <thead><th style={{ textAlign: 'center', fontSize: '20px', padding: '10px' }}>Propostas do Candidato</th></thead>
                <tbody>

                    {
                        props.candidatoSelecionado.propostas.map((proposta) => {
                            return (
                                <tr>
                                    <td>
                                        {proposta}
                                    </td>
                                </tr>
                            );
                        })
                    }

                </tbody>
            </Table>
            <Table striped bordered hover>
                <thead><th style={{ textAlign: 'center', fontSize: '20px', padding: '10px' }}>Questionamentos ao Candidato</th></thead>
                <tbody>
                    {
                        questionamentos?.map((questionamento) => {
                            return (
                                <tr>
                                    <td>
                                        {questionamento}
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>

            <Row>
                <Col md={1}>
                    <Button onClick={() => { props.setDetalharCandidato(false) }} className="mt-1" variant="success">Voltar</Button>
                </Col>
                <Col md={2}>
                    <Button onClick={() => { setFormQuest(true) }} className="mt-1" variant="success">Fazer Questionamento</Button>
                </Col>
            </Row>

            {
                formQuest ?
                    <>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="8">
                                    <Form.Label>Questionamento</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        id="questionamento"
                                        name="questionamento"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Seu nome</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        id="nome"
                                        name="nome"
                                    />
                                </Form.Group>
                            </Row>
                            <Col md={2}>
                                <Button type="submit">Registrar</Button>
                            </Col>
                        </Form>
                    </> :
                    ''
            }
        </Container>
    );
}
/*
    "id": 0,
    "email": "",
    "nome": "",
    "avatar": "",
    "propostas": [],
    "curtidas":0,
    "descurtidas":0,
    "questionamentos":[]
*/