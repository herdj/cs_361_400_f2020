import React from 'react';
import { firestore, auth } from '../firebase/firebase';
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';


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
        setLoadData(skill);
    }

    const deleteSkill = async (skill) => {
        console.log(skill);
        const { uid } = auth.currentUser;
        await firestore.collection('users').doc(uid).update({
            skills: firebase.firestore.FieldValue.arrayRemove(skill)
        });
        setSkill(`${skill} deleted`);
        setLoadData(skill);
    }

    const onAddUserCourse = async (e) => {
        e.preventDefault();
        const { uid } = auth.currentUser;
        await firestore.collection('users').doc(uid).update({
            courses: firebase.firestore.FieldValue.arrayUnion(course)
        });
        setCourse('');
        setLoadData(course);
    }

    const deleteCourse = async (course) => {
        console.log(course);
        const { uid } = auth.currentUser;
        await firestore.collection('users').doc(uid).update({
            courses: firebase.firestore.FieldValue.arrayRemove(course)
        });
        setCourse(`${course} deleted`);
        setLoadData(course);
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
                    <div className="col">
                    <h1>Edit Profile For: </h1>
                        <h3 className="pt-2" >{userData === "start" ? "Sign in to view profile" : userData.displayName}</h3>
                    </div>
                </div>
            <Tabs className="pt-4" defaultActiveKey="skills" id="uncontrolled-tab-example">
            <Tab eventKey="skills" title="Skills">
                            <div>
                                <ul className="list-group list-group-flush pt-3">
                                    <h5 className="pr-4 text-end" style={{textAlign: 'end'}}>Delete</h5>
                                    {userData !== "start" && userData.skills !== undefined && userData.skills.map(skill =>
                                         <li className="list-group-item" key={skill}>{skill}<button onClick={() => deleteSkill(skill)} className="float-right btn"><FaTrashAlt size={25} style={{color: 'red'}}/></button></li>)}
                                </ul>
                            </div>
                       
                            <div className="pt-3 pl-3">
                                <form onSubmit={onAddUserSkill}>
                                    <input type="text" value={skill || ''} onChange={(e) => setSkill(e.target.value)} placeholder="Add Skill" />
                                    <button type="submit" className="btn ml-3 mb-1" disabled={!skill}><BsPlusCircleFill size={40} style={{color: 'green'}} /></button>
                                </form> 
                            </div>
            </Tab>
            <Tab eventKey="courses" title="Courses">
            <div>
                                <ul className="list-group list-group-flush pt-3">
                                <h5 className="pr-4" style={{textAlign: 'end'}}>Delete</h5>
                                    {userData !== "start" && userData.courses !== undefined && userData.courses.map(course => 
                                    <li className="list-group-item" key={course}>{course}<button onClick={() => deleteCourse(course)}className="float-right btn"><FaTrashAlt size={25} style={{color: 'red'}}/></button></li>)}
                                </ul>
                            </div>

                       
                            <div className="pt-3 pl-3" style={{display: 'flex', margin: 'auto', verticalAlign: 'middle'}}>
                                <form onSubmit={onAddUserCourse}>
                                    <input type="text" value={course || ''} onChange={(e) => setCourse(e.target.value)} placeholder="Add Course" />
                                    <button type="submit" className="btn ml-3 mb-1" disabled={!course}><BsPlusCircleFill size={40} style={{color: 'green'}} /></button>
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
                <h1>Sign In To Edit Profile</h1>
            </Container>
        );
    }

}

export default EditProfile;  