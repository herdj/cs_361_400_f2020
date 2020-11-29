import React from 'react';
import { firestore, auth } from '../firebase/firebase';
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
/* React Icons */
import { GrGithub } from 'react-icons/gr';
import { GrTwitter } from 'react-icons/gr';
import { GrLinkedin } from 'react-icons/gr';
import { GrStar } from 'react-icons/gr';
/* React Bootstrap Components */
import Image from "react-bootstrap/Image";
import Alert from 'react-bootstrap/Alert';

const ICON_STYLES = {
    height: "20px",
    width: "20px",
    cursor: "pointer"
}

const ICON_STYLES_LINK = {
    color: "inherit"
}

const trophyIcon = <GrStar className="mb-2" style={ICON_STYLES}/>;


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
    const [gitHub, setGitHub] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [twitter, setTwitter] = useState('');
    const [organization, setOrganization] = useState('');
    const [alert, setAlert] = useState('false');
    const [photoURL, setPhotoURL] = useState('');
    
    useEffect(() => {
        const getUserData = async () => {
            if (auth.currentUser != null) {
                const { uid, photoURLUpdate } = auth.currentUser;
                setPhotoURL(photoURLUpdate);
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
        const { uid } = auth.currentUser;
        await firestore.collection('users').doc(uid).update({
            skills: firebase.firestore.FieldValue.arrayRemove(skill2)
        });
        setSkill(skill2);
        setLoadData(skill);
    }

    const deleteCourse = async (course2) => {
        const { uid } = auth.currentUser;
        await firestore.collection('users').doc(uid).update({
            courses: firebase.firestore.FieldValue.arrayRemove(course2)
        });
        setCourse(course2);
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
        setAlert('true');
        myTimer();
    }

    const handleIndustryChange = (event) => {
        setIndustry(event.target.value);
    }

    const onChangeLinkedIn = async (event) => {
        event.preventDefault();
        await firestore.collection('users').doc(uid).update({
            linkedIn: linkedIn
        }).then(function() {
            console.log("success for LinkedIn");
        }).catch(function(error) {
            console.error("Error updating document: ", error);
        })
        setLoadData(linkedIn);
        setAlert('true');
        myTimer();
    }

    const onChangeTwitter = async (event) => {
        event.preventDefault();
        await firestore.collection('users').doc(uid).update({
            twitter: twitter
        }).then(function() {
            console.log("success for Twitter");
        }).catch(function(error) {
            console.error("Error updating document: ", error);
        })
        setLoadData(twitter);
        setAlert('true');
        myTimer();
    }

    const onChangeGitHub = async (event) => {
        event.preventDefault();
        await firestore.collection('users').doc(uid).update({
            gitHub: gitHub
        }).then(function() {
            console.log("success for GitHub");
        }).catch(function(error) {
            console.error("Error updating document: ", error);
        })
        setLoadData(gitHub);
        setAlert('true');
        myTimer();
    }

    const onChangeOrganization = async (event) => {
        event.preventDefault();
        await firestore.collection('users').doc(uid).update({
            organization: organization
        }).then(function() {
            console.log("success for organization");
        }).catch(function(error) {
            console.error("Error updating document: ", error);
        })
        setLoadData(organization);
        setAlert('true');
        myTimer();
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

    const onSubmitPhoto = async (event) => {
        event.preventDefault();
        await firestore.collection('users').doc(uid).update({
            photoURL: photoURL
        }).then(function() {
            console.log("success updating photo");

        }).catch(function(error) {
            console.error("Error updating document: ", error);
        })
        setLoadData(photoURL);
        setAlert('true');
        myTimer();
    }


    function validateCourse(){
        let courseCode = courseNumber;
        let courseRGEX = /^[0-9]{3}$/i;
        let courseResult = courseRGEX.test(courseCode);
        if(courseResult === false) {
          alert('Please enter a valid course number with three numbers (examples: 290, 325, 361, 340)');
          return false;
        }
        return true;
      }

    const myTimer = () => {
        setTimeout(function() {setAlert('false');}, 3000);
    }

    if (loggedIn === "start"){
        auth.onAuthStateChanged(function(user) {
            if(user) {
                setLoggedIn("true");
                setLoadData("loadInitalData")
                const { uid, photoURL } = auth.currentUser;
                setUid(uid);
                setPhotoURL(photoURL);
            } else {
                setLoggedIn("false");
            }
        });
    }

    if (loggedIn === "true") {
        return (
            <Container className="mt-5">
                <Row className="justify-content-center pb-2">
                    <Col xs={1} md={1}></Col>
                    <Col className="text-right" xs={3} md={4}>
                        <Image className="mt-2" src={userData.photoURL} alt="" width={125} height={125} roundedCircle/><br />
                        <Form onSubmit={onSubmitPhoto} className="pt-2">
                            <Button size="sm" variant="outline-dark" type="submit" className="mr-3">
                                Sync Photo
                            </Button>
                        </Form>
                    </Col>
                    <Col className="text-left font-italic pl-4 pt-3" style={{color: '#343a40'}} xs={7} md={6}>
                        <h1 className="mb-0 pb-0 pl-1">{userData === "start" ? "Sign in to view profile" : userData.displayName}</h1>
                        <Form onSubmit={onChangeDisplayName}>
                            <Form.Row>
                            <Form.Label column="sm" sm="auto" className="text-capitalize text-md">
                                NAME
                            </Form.Label>
                            <Col column="sm" sm={5} className="ml-2">
                            <Form.Control size="sm" lg={2} type="text" value={displayName || ''} onChange={(e) => setDisplayName(e.target.value)} placeholder={userData !== "start" && userData.displayName !== undefined ? userData.displayName : ''} />
                            </Col>
                            <Col xs="auto">
                            <Button size="sm" variant="outline-dark" type="submit">Update</Button>
                            </Col>
                            </Form.Row>
                        </Form>
                        <span className="my-2 text-info pl-3">{userData.email}</span><br />
                    </Col>
                    <Col xs={1} md={1}></Col>
                </Row>

                <div className="container-fluid col-10">
                <div className="text-capitalize col-auto border rounded border-warning mt-2" style={{color: '#343a40'}}>
                {alert === "true" ? <Alert variant="success">Update Successful</Alert> : <span></span>}
                <div className="justify-content-center d-flex">
                            <Button  id="endorseButton" variant="primary" size="sm" variant="outline-dark" className="py-0 my-2" href="/endorsements">View Endorsements</Button>
                    </div>
                <dl className="row auto-x mb-0">
                    <dt className="col-sm-12 col-md-4 col-lg-4 text-md-right"><GrGithub className="mr-3 my-2" style={ICON_STYLES}/>GITHUB</dt>
                    <dd className="col-sm-12 col-md-8 col-lg-8 font-italic pt-1" style={{textTransform: "lowercase"}}>
                        <Form onSubmit={onChangeGitHub}>
                            <Form.Row>
                            <Form.Label column="sm" sm="4">
                                https://github.com/
                            </Form.Label>
                            <Col column="sm" sm={4}>
                            <Form.Control size="sm" lg={2} type="text" value={gitHub || ''} onChange={(e) => setGitHub(e.target.value)} placeholder={userData !== "start" && userData.gitHub !== undefined ? userData.gitHub : ''} />
                            </Col>
                            <Col xs="auto">
                                <Button size="sm" variant="outline-dark" type="submit">Update</Button>
                            </Col>
                            </Form.Row>
                        </Form>
                    </dd>

                    <dt className="col-sm-12 col-md-4 col-lg-4 text-md-right"><GrLinkedin className="mr-3 my-2" style={ICON_STYLES}/>LINKEDIN</dt>
                    <dd className="col-sm-12 col-md-8 col-lg-8 font-italic pt-1" style={{textTransform: "lowercase"}}>
                        <Form onSubmit={onChangeLinkedIn}>
                            <Form.Row>
                            <Form.Label column="sm" sm="4">
                                https://www.linkedin.com/in/
                            </Form.Label>
                            <Col column="sm" sm={4}>
                            <Form.Control size="sm" lg={2} type="text" value={linkedIn || ''} onChange={(e) => setLinkedIn(e.target.value)} placeholder={userData !== "start" && userData.linkedIn !== undefined ? userData.linkedIn : ''} />
                            </Col>
                            <Col xs="auto">
                                <Button size="sm" variant="outline-dark" type="submit">Update</Button>
                            </Col>
                            </Form.Row>
                        </Form>
                    </dd>

                    <dt className="col-sm-12 col-md-4 col-lg-4 text-md-right"><GrTwitter className="mr-3 my-2" style={ICON_STYLES}/>TWITTER</dt>
                    <dd className="col-sm-12 col-md-8 col-lg-8 font-italic pt-1" style={{textTransform: "lowercase"}}>
                        <Form onSubmit={onChangeTwitter}>
                            <Form.Row>
                            <Form.Label column="sm" sm="4">
                                https://twitter.com/
                            </Form.Label>
                            <Col column="sm" sm={4}>
                            <Form.Control size="sm" lg={2} type="text" value={twitter || ''} onChange={(e) => setTwitter(e.target.value)} placeholder={userData !== "start" && userData.twitter !== undefined ? userData.twitter : ''} />
                            </Col>
                            <Col xs="auto">
                                <Button size="sm" variant="outline-dark" type="submit">Update</Button>
                            </Col>
                            </Form.Row>
                        </Form>
                    </dd>

                    <dt className="col-sm-12 col-md-4 col-lg-4 text-md-right pt-1">ORGANIZATION</dt>
                    <dd className="col-sm-12 col-md-8 col-lg-8 font-italic">
                        <Form onSubmit={onChangeOrganization}>
                        <Form.Row>
                        <Form.Label column="sm" sm="4">
                                {userData.organization}
                            </Form.Label>
                        <Col column="sm" sm={4}>
                            <Form.Control size="sm" lg={2} type="text" value={organization || ''} onChange={(e) => setOrganization(e.target.value)} placeholder={userData !== "start" && userData.organization !== undefined ? userData.organization : ''} />
                        </Col>
                        <Col xs="auto">
                            <Button size="sm" variant="outline-dark" type="submit">Update</Button>
                        </Col>
                        </Form.Row>
                        </Form>
                    </dd>
        
                    <dt className="col-sm-12 col-md-4 col-lg-4 text-md-right pt-1">INDUSTRY</dt>
                    <dd className="col-sm-12 col-md-8 col-lg-8 font-italic">
                        <Form onSubmit={onChangeIndustry}>
                        <Form.Row>
                        <Form.Label column="sm" sm="4">
                                {userData.industry}
                            </Form.Label>
                        <Col column="sm" sm={4}>
                            <Form.Control size="sm" value={industry} as="select" onChange={handleIndustryChange}>
                                {criteria !== "start" && criteria.industries !== undefined && criteria.industries.map(industry => 
                                <option value={industry} key={industry}>{industry}</option>)}
                            </Form.Control> 
                        </Col>
                        <Col xs="auto">
                            <Button size="sm" variant="outline-dark" type="submit">Update</Button>
                        </Col>
                        </Form.Row>
                        </Form>
                    </dd>
                </dl>
                </div>
                </div>
                 
                <div className="container-fluid col-10">
                <div className="text-capitalize col-auto border rounded border-warning mt-2" style={{color: '#343a40'}}>
                <Tabs className="pt-4" defaultActiveKey="skills" id="uncontrolled-tab-example">
            <Tab eventKey="skills" title="SKILLS">
                            <div>
                                <ul className="list-group list-group-flush pt-3">
                                    <h6 className="pr-4" style={{textAlign: 'end', fontWeight: 'bold'}}>DELETE</h6>
                                    {userData !== "start" && userData.skills !== undefined && userData.skills.map(skill =>
                                         <li className="list-group-item font-italic" key={skill}>{skill}<button onClick={() => deleteSkill(skill)} className="float-right btn"><FaTrashAlt size={22} style={{color: 'red'}}/></button></li>)}
                                </ul>
                            </div>
                       
                            <div className="pt-3 pl-3">
                                <form onSubmit={onAddUserSkill}>
                                <Form.Label className="pr-2" style={{fontWeight: 'bold'}}>ADD SKILL</Form.Label>
                                    <input type="text" value={skill || ''} onChange={(e) => setSkill(e.target.value)} placeholder="Add Skill" />
                                    <button type="submit" className="btn ml-3 mb-1" disabled={!skill}><BsPlusCircleFill size={35} style={{color: 'green'}} /></button>
                                </form> 
                            </div>
            </Tab>
            <Tab eventKey="courses" title="COURSES">
                             <div>
                                <ul className="list-group list-group-flush pt-3">
                                <h6 className="pr-4" style={{textAlign: 'end', fontWeight: 'bold'}}>DELETE</h6>
                                    {userData !== "start" && userData.courses !== undefined && userData.courses.map(course => 
                                    <li className="list-group-item font-italic" key={course}>{course}<button onClick={() => deleteCourse(course)}className="float-right btn"><FaTrashAlt size={22} style={{color: 'red'}}/></button></li>)}
                                </ul>
                            </div>
                <Form inline onSubmit={onSubmitCourseTwo}>
                    <Form.Group controlId="exampleForm.ControlSelect1" >
                    <Form.Label className="pr-2" style={{fontWeight: 'bold'}}>ADD COURSE </Form.Label>
                        <Form.Control className="mr-sm-2" value={courseSubject} as="select" onChange={handleCourseSubjectChange}>
                            <option>Pick A Course</option>
                        {criteria !== "start" && criteria.courses !== undefined && criteria.courses.map(courseSubject => 
                                    <option value={courseSubject} key={courseSubject}>{courseSubject}</option>)}
                        </Form.Control> 
                        <Form.Control placeholder="" type="text" onChange={handleCourseNumberChange}></Form.Control> 
                    </Form.Group>
                    <button type="submit" className="btn ml-3 mb-1" disabled={!courseNumber || !courseSubject}><BsPlusCircleFill size={35} style={{color: 'green'}} /></button>
                </Form>
            </Tab>
            </Tabs>
            
                </div>
                </div>
                <div className="text-center">
                    <a href={"/search"}>
                        <Button variant="primary" size="sm" variant="outline-dark" className="py-0 my-2">Search Profiles</Button>
                    </a>
                </div> 
            
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