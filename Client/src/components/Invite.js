import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { firestore } from '../firebase/firebase';
import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function InviteExpert() {
    const fire_base = firestore.collection('users');
    const query = fire_base;
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const [profileRegistry] = useCollectionData(query, {idField : 'id'});

    const check_mail = () => {
        console.log(profileRegistry.length);
        for (let i = 0; i < profileRegistry.length; i++) {
            if (profileRegistry[i].email.toLowerCase() === email.toLowerCase()) {
                setFail(true);
                return false;
            };
        }
        setSuccess(true);
        return true;
    }

    const validate = (email_addr) => {
        const expression = /\S+@\S+/
        return expression.test(String(email_addr).toLowerCase())
    }

    const submit_handler = (event) => {
        event.preventDefault();
        if (check_mail()){
            return;
        }
    }

    return (
        <Container fluid="md">
            <h1>Invite an Expert</h1>
            { success === false && fail === false && (
            <Row>
                <Col xs="4">
                    <Form onSubmit = {submit_handler}>
                        <Form.Group>
                            <Form.Control type="text" onChange={(e)=>setFirst_name(e.target.value)} placeholder="first name"/><br/>
                            <Form.Control type="text" onChange={(e)=>setLast_name(e.target.value)} placeholder="last name"/><br/>
                            <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="email address"/><br/>
                            <Button variant="primary" type="submit">Invite Expert</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            )}
            { success === true && (
                <div>
                    <p>Thanks for inviting {first_name} {last_name}</p>
                    <Button variant="primary" onClick={(e)=>setSuccess(false)}>Okay</Button>
                </div>
                )}
            { fail === true && (
                <div>
                    <p>{first_name} {last_name} is already one of our experts.</p>
                    <Button variant="primary" onClick={(e)=>setFail(false)}>Okay</Button>
                </div>
            )}
        </Container>
    );
}

export default InviteExpert;