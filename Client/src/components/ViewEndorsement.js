import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { auth , firestore } from '../firebase/firebase';
import firebase from 'firebase/app';
import Card from 'react-bootstrap/Card';

const ViewEndorsement = () => {
    const [userData, setUserData] = useState([]);
    const [loggedIn, setLoggedIn] = useState("start");

    if (loggedIn === "start"){
        auth.onAuthStateChanged(function(user) {
            if(user) {
                const { uid } = auth.currentUser;
                const documentRef = firestore.collection('endorsements');
                const query = documentRef.where("uid", "==", `${uid}`);
                query.get().then((querySnapshot) => {querySnapshot.forEach((doc) => {
                    let data =  doc.data();
                    data["docId"] = doc.id
                    setUserData(userData => [...userData, data]);
                    })
                });
                setLoggedIn("true");
            } else {
                setLoggedIn("false");

            }
        });
    }

    if (loggedIn === "true") {
        return (
            <div>
                {userData && <GetEndorsements data={userData} />}
            </div>
    
        );
    } else if(loggedIn === "start"){
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border mt-5">
                </div>
            </div>
        );
    } else {
        return(
            <h2>Login to see endorsements</h2>
        );
    }
}

function GetEndorsements(props) {

    const onSubmitApprove = (e, info) => {
        if (info.category === "courses") {
            addUserCourse(info);
        } else if (info.category === "skills") {
            addUserSkill(info);
        } else {
            console.log("yo there was an error");
        };
    };

    const onSubmitReject = (e, info) => {
        deleteEndorsement(info);
    }

    const addUserSkill = async (info) => {
        await firestore.collection('users').doc(info.uid).update({
            skills: firebase.firestore.FieldValue.arrayUnion(info.endorsement)
        });
        deleteEndorsement(info);
    }

    const addUserCourse = async (info) => {
        await firestore.collection('users').doc(info.uid).update({
            courses: firebase.firestore.FieldValue.arrayUnion(info.endorsement)
        });
        deleteEndorsement(info);
    }

    const deleteEndorsement = async (info) => {
        await firestore.collection('endorsements').doc(info.docId).delete().then(() => {
            console.log("Endorsement deleted")
        }).catch((error) => {
            console.log("Error with request: ", error);
        })
        window.location.reload(false);
    }

    return (
        <>
            {props.data && props.data.map(info =>
                <Container className="pt-2 mx-auto"> 
                    <Card className="mx-auto" style={{ width: '50%' }}>
                        <Card.Body>
                            <Card.Header>Endorsement</Card.Header>
                            <div key={info.docId} className="pb-2 pt-2">
                                    <Card.Text value={info.category}><strong>Category: </strong>{info.category}</Card.Text>
                                    <Card.Text value={info.endorsement}><strong>Endorsement: </strong>{info.endorsement}</Card.Text>
                                </div>
                                <Button type="submit" onClick={(e) => onSubmitApprove(e, info)}>Approve</Button>
                                <Button type="submit" onClick={(e) => onSubmitReject(e, info)} variant="danger" className="float-right">Reject</Button>
                        </Card.Body>
                    </Card>  
                </Container>)} 
        </>
    );
};

export default ViewEndorsement; 