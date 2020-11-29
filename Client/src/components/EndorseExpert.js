import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { firestore } from '../firebase/firebase';
import firebase from 'firebase/app';

const EndorseExpert = () => {
    let { id } = useParams();
    const [endorsement, setEndorsement] = useState('');
    const [category, setCategory] = useState('');
    const [alert, setAlert] = useState('false');

    const onSubmit = async (e) => {
        e.preventDefault();
        await firestore.collection('endorsements').add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                category: category,
                endorsement: endorsement,
                uid: id
        })
        console.log(endorsement);
        console.log(category);
        setCategory('');
        setEndorsement('');
        setAlert('true');
        myTimer(); 
    }

    const myTimer = () => {
        setTimeout(function() {setAlert('false');}, 4000);
    }

    return ( 
        <Container>
            {alert === "true" ? <Alert variant="success">Endorsement Submitted</Alert> : <span></span>}
            <h1 className="pt-4">Endorse Profile<span className="float-right"><Button href={`/view-profile/${id}`}>Back</Button></span></h1>
            <Form onSubmit={onSubmit}>
                
                <Form.Group>
                <Form.Label className="pt-3">Choose a category:</Form.Label>
                <Form.Control as="select" onChange={(e) => setCategory(e.target.value)}>
                    <option></option>
                    <option value="skills">skills</option>
                    <option value="courses">courses</option>
                </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                <Form.Label>Add Endorsement:</Form.Label>
                <Form.Control type="text" placeholder="Endorse here" value={endorsement} onChange={(e) => setEndorsement(e.target.value)} />
                </Form.Group>
                <div className="pt-3">
                <Button type="submit">Submit Endorsement</Button>
                </div>
            </Form>
            </Container>
    );
}

export default EndorseExpert; 