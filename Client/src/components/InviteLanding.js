import React from 'react';
import Container from 'react-bootstrap/Container';
import Auth from './Auth'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { auth } from '../firebase/firebase';
import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';

function InviteLanding(){
    const [loggedIn, setLoggedIn] = useState("start");
    const [loadData, setLoadData] = useState("start");

    useEffect(() => {
        const getUserData = async () => {
            if (auth.currentUser != null) {
                setLoggedIn("true");
                console.log("Already logged in... rerouting user.");
            } 
            else {
                setLoggedIn("false");
                console.log("New Expert - not logged in.");
            }
        }
        getUserData();
    },[loadData]);

    if (loggedIn === "start"){
        auth.onAuthStateChanged(function(user) {
            if(user) {
                setLoggedIn("true");
                setLoadData("loadInitalData")
           
            } else {
                setLoggedIn("false");
            }
        });
    }
    
    if (loggedIn === "true"){
        return<Redirect to='/user-profile/edit'/>
    }
    else {
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
                            <Auth onChange={(e)=>setLoggedIn(true)}/>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

export default InviteLanding;

