import React from 'react';
import { firestore, auth } from '../firebase/firebase';
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


function EditProfile() {
    const [userData, setUserData] = useState("start");
    const [loggedIn, setLoggedIn] = useState("start");
    const [skill, setSkill] = useState('');
    const [course, setCourse] = useState('');
    const [loadData, setLoadData] = useState("start");
    
    useEffect(() => {
        const getUserData = async () => {
            if (auth.currentUser != null) {
                const { uid } = auth.currentUser;
                await firestore.collection('users').doc(uid).get().then(function(doc) {
                    console.log("yo homie")
                    setUserData(doc.data());
                }).catch(function(error) {
                    console.log("error getting data: ", error);
                })
            } else {
                console.log("need to login");
            }
        }
        getUserData();
    },[loadData]);

    const onAddUserSkill = async (e) => {
        e.preventDefault();
        const { uid } = auth.currentUser;
        await firestore.collection('users').doc(uid).update({
            skills: firebase.firestore.FieldValue.arrayUnion(skill)
        });
        setSkill('');
        setLoadData("skillAdded");
    }

    const deleteSkill = async (skill) => {
        console.log(skill);
        const { uid } = auth.currentUser;
        await firestore.collection('users').doc(uid).update({
            skills: firebase.firestore.FieldValue.arrayRemove(skill)
        });
        setSkill(`${skill} deleted`);
        setLoadData("skillDeleted");
    }

    const onAddUserCourse = async (e) => {
        e.preventDefault();
        const { uid } = auth.currentUser;
        await firestore.collection('users').doc(uid).update({
            courses: firebase.firestore.FieldValue.arrayUnion(course)
        });
        setCourse('');
        setLoadData("courseAdded");
    }

    const deleteCourse = async (course) => {
        console.log(course);
        const { uid } = auth.currentUser;
        await firestore.collection('users').doc(uid).update({
            courses: firebase.firestore.FieldValue.arrayRemove(course)
        });
        setCourse(`${course} deleted`);
        setLoadData("courseDeleted");
    }

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

    if (loggedIn === "true") {
        return (
            <Container>
                <div className="row pt-4">
                    <div className="media col-5 justify-content-center"> 
                        <img style={{border: "3px solid"}} src={userData === "start" ? "" :userData.photoURL} className="align-self-center mr-3" alt=""></img>
                    </div>
                    <div className="col text-center mr-5">
                        <h1>{userData === "start" ? "Sign in to view profile" : userData.displayName}</h1>
                        <h5>{userData.email}</h5>
                    </div>
                </div>
            <Tabs className="pt-4" defaultActiveKey="skills" id="uncontrolled-tab-example">
            <Tab eventKey="skills" title="Skills">
                            <div>
                                <ul className="list-group list-group-flush pt-3">
                                    {userData !== "start" && userData.skills !== undefined && userData.skills.map(skill =>
                                         <li className="list-group-item" key={skill}>{skill}<button onClick={() => deleteSkill(skill)}className="float-right btn btn-danger">Delete</button></li>)}
                                </ul>
                            </div>
                       
                            <div className="pt-3">
                                <form onSubmit={onAddUserSkill}>
                                    <input type="text" value={skill || ''} onChange={(e) => setSkill(e.target.value)} placeholder="Enter Skill" />
                                    <button type="submit" className="btn btn-success ml-3" disabled={!skill}>Add Skill</button>
                                </form> 
                            </div>
            </Tab>
            <Tab eventKey="courses" title="Courses">
            <div>
                                <ul className="list-group list-group-flush pt-3">
                                    {userData !== "start" && userData.courses !== undefined && userData.courses.map(course => 
                                    <li className="list-group-item" key={course}>{course}<button onClick={() => deleteCourse(course)}className="float-right btn btn-danger">Delete</button></li>)}
                                </ul>
                            </div>
                       
                            <div className="pt-3">
                                <form onSubmit={onAddUserCourse}>
                                    <input type="text" value={course || ''} onChange={(e) => setCourse(e.target.value)} placeholder="Enter Course" />
                                    <button type="submit" className="btn btn-success ml-3" disabled={!course}>Add Course</button>
                                </form> 
                            </div>
            </Tab>
            </Tabs>
            </Container>
        )
    } else if (loggedIn === "start"){
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border mt-5">
                </div>
            </div>
        );
    } else {
        return (
            <Container className="mt-3">
                <h1>Sign In To View Profile</h1>
            </Container>
        );
    }

}

export default EditProfile;  