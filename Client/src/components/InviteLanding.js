import React from 'react';
import Container from 'react-bootstrap/Container';
import Auth from './Auth'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function InviteLanding(){

    return (
        <Container className="mt-3">
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h1>Welcome Expert!</h1>
                </Col>
            </Row>
            <div className="mt-3">
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Auth />
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default InviteLanding;