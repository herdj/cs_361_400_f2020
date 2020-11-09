import React from 'react';
import { firestore, auth } from '../firebase/firebase';
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function EditProfile() {
    const [userData, setUserData] = useState("start");
    const [loggedIn, setLoggedIn] = useState("start");
    const [skill, setSkill] = useState('');
    const [course, setCourse] = useState('');
    const [loadData, setLoadData] = useState("start");
    const [criteria, setCriteria] = useState("start");
    const [industry, setIndustry] = useState('');
    const [uid, setUid] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [courseSubject, setCourseSubject] = useState('');
    const [courseNumber, setCourseNumber] = useState('');
    
    useEffect(() => {
        const getUserData = async () => {
            if (auth.currentUser != null) {
                const { uid } = auth.currentUser;
                await firestore.collection('users').doc(uid).get().then(function(doc) {
                    setUserData(doc.data());
                }).catch(function(error) {
                    console.log("error getting data: ", error);
                })
                await firestore.collection('criteria').doc('lookups').get().then(function(doc) {
                    setCriteria(doc.data());
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

    const deleteSkill = async (skill2) => {
        console.log(skill2);
        const { uid } = auth.currentUser;
        await firestore.collection('users').doc(uid).update({
            skills: firebase.firestore.FieldValue.arrayRemove(skill2)
        });
        setSkill(`${skill2} deleted`);
        setLoadData(skill);
    }

   

    const deleteCourse = async (course2) => {
        console.log(course2);
        const { uid } = auth.currentUser;
        await firestore.collection('users').doc(uid).update({
            courses: firebase.firestore.FieldValue.arrayRemove(course2)
        });
        setCourse(`${course2} deleted`);
        setLoadData(course);
    }

    const onChangeIndustry = async (event) => {
        event.preventDefault();
        await firestore.collection('users').doc(uid).update({
            industry: industry
        }).then(function() {
            console.log("success for industry");
        }).catch(function(error) {
            console.error("Error updating document: ", error);
        })
        setLoadData(industry);
    }

    const handleIndustryChange = (event) => {
        setIndustry(event.target.value);
    }

    const onChangeDisplayName = async (event) => {
        event.preventDefault();
        await firestore.collection('users').doc(uid).update({
            displayName: displayName
        }).then(function() {
            console.log("success for display name");
        }).catch(function(error) {
            console.error("Error updating document: ", error);
        })
        setLoadData(displayName);
    }

    const handleCourseSubjectChange = (event) => {
        setCourseSubject(event.target.value);
    }

    const handleCourseNumberChange = (event) => {
        setCourseNumber(event.target.value);
    }

    const onSubmitCourseTwo = async (event) => {
        event.preventDefault();
        validateCourse();
        let combineCourse = courseSubject + ' ' + courseNumber;
        const { uid } = auth.currentUser;
        await firestore.collection('users').doc(uid).update({
            courses: firebase.firestore.FieldValue.arrayUnion(combineCourse)
        });
        setCourseSubject('');
        setCourseNumber('');
        setLoadData(combineCourse);
    }


    function validateCourse(){
        let courseCode = courseNumber;
        let courseRGEX = /^[0-9]{3}$/i;
        // let courseRGEX = /^[A-Z]{1,4}[_]{0,1}[-]{0,1}[ ]{0,1}[0-9]{3}$/i;
        let courseResult = courseRGEX.test(courseCode);
        if(courseResult === false) {
          alert('Please enter a valid course number (examples: CS290, CS 290, CS_290, CS-290)');
          return false;
        }
        return true;
      }

    if (loggedIn === "start"){
        auth.onAuthStateChanged(function(user) {
            if(user) {
                setLoggedIn("true");
                setLoadData("loadInitalData")
                const { uid } = auth.currentUser;
                setUid(uid);
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
                <Form inline onSubmit={onSubmitCourseTwo}>
                    <Form.Group controlId="exampleForm.ControlSelect1" >
                    <Form.Label className="pr-2">Add Course: </Form.Label>
                        <Form.Control className="mr-sm-2" value={courseSubject} as="select" onChange={handleCourseSubjectChange}>
                            <option>Pick A Course</option>
                        {criteria !== "start" && criteria.courses !== undefined && criteria.courses.map(courseSubject => 
                                    <option value={courseSubject} key={courseSubject}>{courseSubject}</option>)}
                        </Form.Control> 
                        <Form.Control placeholder="" type="text" onChange={handleCourseNumberChange}></Form.Control> 
                    </Form.Group>
                    <button type="submit" className="btn ml-3 mb-1" disabled={!courseNumber || !courseSubject}><BsPlusCircleFill size={40} style={{color: 'green'}} /></button>
                </Form>
            </Tab>
            <Tab eventKey="industry" title="Industry">
                <h4>Current Industry: {userData !== "start" && userData.industry !== undefined ? userData.industry : ''}</h4>
            <Form onSubmit={onChangeIndustry}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Update Industry</Form.Label>
                    <Form.Control value={industry} as="select" onChange={handleIndustryChange}>
                    {criteria !== "start" && criteria.industries !== undefined && criteria.industries.map(industry => 
                                    <option value={industry} key={industry}>{industry}</option>)}
                    </Form.Control> 
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            </Tab>
            <Tab eventKey="displayName" title="Display Name">
                <h4>Current Display Name: {userData !== "start" && userData.displayName !== undefined ? userData.displayName : ''}</h4>
            <Form onSubmit={onChangeDisplayName}>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Update Display Name
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" value={displayName || ''} onChange={(e) => setDisplayName(e.target.value)} placeholder={userData !== "start" && userData.displayName !== undefined ? userData.displayName : ''} />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
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