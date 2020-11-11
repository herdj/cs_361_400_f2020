import React from 'react';
import Popup from "./Popup";
import GitHubUserInfo from "./GitHubUserInfo";
import GitHubUserRepoInfo from "./GitHubUserRepoInfo";
import { firestore } from '../firebase/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { useState } from 'react';
/* React Bootstrap Components */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from 'react-bootstrap/Button';
/* React Icons */
import { GrGithub } from 'react-icons/gr';
import { GrTwitter } from 'react-icons/gr';
import { GrLinkedin } from 'react-icons/gr';
import { GrStar } from 'react-icons/gr';

const ICON_STYLES = {
    height: "20px",
    width: "20px",
    cursor: "pointer"
}

const ICON_STYLES_LINK = {
    color: "inherit"
}

function ViewProfile() {

    let { id } = useParams();
    const documentRef = firestore.collection("users").doc(id);
    const [userProfile] = useDocumentData(documentRef);

    return (
        <>
            {userProfile && <ProfileData data={userProfile} />}
        </>
    );
}

function ProfileData(props) {

    const { displayName, courses, skills, photoURL, email, uid, organization, industry, gitHub, linkedIn, twitter } = props.data;
    const [loggedIn, setLoggedIn] = useState("start");
    
    let awardCourse;
    if (courses.length > 4) {
        awardCourse =  <GrStar className="mb-2" style={ICON_STYLES}/>;
    }
    
    let awardSkills;
    if (skills.length >= 1) {
        awardSkills = <GrStar className="mb-2" style={ICON_STYLES}/>;
    }


/************************** POPUP - START *****************************/

    // Note: This sets ref equal to popUpRef, which will put Popup 
    // methods into popupRef. This gives us access to the openPopup() 
    // and closePopup() via 'popupRef.current'.
    // Resource used: https://www.youtube.com/watch?v=SmMZqh1xdB4
    const popupRef = React.useRef();

    const openPopup= () => {
        popupRef.current.openPopup();
    };
  
/**************************** POPUP - END *****************************/

    if (loggedIn === "start") {
        auth.onAuthStateChanged(function(user) {
            if (user) {
                setLoggedIn("true");
            } else {
                setLoggedIn("false");
            }
        })
    }

    return (

/************************** POPUP - START *****************************/
        <>
        <Popup ref={popupRef}>

        <GitHubUserInfo></GitHubUserInfo>
        <hr />
        <GitHubUserRepoInfo></GitHubUserRepoInfo>

        </Popup>
{/*************************** POPUP - END ****************************/}
        
        <Container className="mt-5">
            <Row className="justify-content-center pb-2">
                <Col xs={1} md={1}></Col>
                <Col className="text-right" xs={3} md={4}>
                    <Image className="mt-2" src={photoURL} alt="" width={125} height={125} roundedCircle/><br />
                </Col>
                <Col className="text-left font-italic pl-4" style={{color: '#343a40'}} xs={7} md={6}>
                    <h1 className="mb-0 pb-0 pl-1">{displayName}</h1>
                    <span className="my-2 text-info">{email}</span><br />
                    <span className="pl-4">
                        <a href={"https://www.linkedin.com/in/" + linkedIn}  target="_blank" style={ICON_STYLES_LINK}>
                            <GrLinkedin className="mr-3 my-2" style={ICON_STYLES}/>
                        </a>
                        <a href={"https://twitter.com/" + twitter}  target="_blank" style={ICON_STYLES_LINK}>
                            <GrTwitter className="mr-3 my-2" style={ICON_STYLES}/> 
                        </a>
                        <a href={"https://github.com/" + gitHub}  target="_blank" style={ICON_STYLES_LINK}>
                            <GrGithub className="mr-3 my-2" style={ICON_STYLES}/>
                        </a> <br />
                        <div className="pl-3">
                          <Button variant="primary" size="sm" variant="outline-dark" className="py-0 my-2" onClick={openPopup}>
                              GitHub Preview
                          </Button>
                        </div>
                    </span>
                </Col>
                <Col xs={1} md={1}></Col>
            </Row>
            <div className="ml-5 text-capitalize" style={{color: '#343a40'}}>
            <dl className="row">
                <dt className="col-sm-12 col-md-3 col-lg-2 text-md-right">{awardCourse}COURSES</dt>
                <dd className="col-sm-12 col-md-9 col-lg-10 font-italic">| {courses && courses.map(course => <span key={course}>{course} | </span>)}</dd>

                <dt className="col-sm-12 col-md-3 col-lg-2 text-md-right">{awardSkills}SKILLS</dt>
                <dd className="col-sm-12 col-md-9 col-lg-10 font-italic">| {skills && skills.map(skill => <span key={skill}>{skill} | </span>)}</dd>

                <dt className="col-sm-12 col-md-3 col-lg-2 text-md-right">ORGANIZATION</dt>
                <dd className="col-sm-12 col-md-9 col-lg-10 font-italic">| {organization} |</dd>
            
                <dt className="col-sm-12 col-md-3 col-lg-2 text-md-right">INDUSTRY</dt>
                <dd className="col-sm-12 col-md-9 col-lg-10 font-italic">| {industry} |</dd>
            </dl>
            </div>
        </Container>
        </>
    )
}

export default ViewProfile; 