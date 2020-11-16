import React from 'react';
import Popup from "./Popup";
import GitHubUserInfo from "./GitHubUserInfo";
import GitHubUserRepoInfo from "./GitHubUserRepoInfo";
import GitHubUserGistInfo from "./GitHubUserGistInfo";
import GitHubUserProjectInfo from "./GitHubUserProjectInfo";
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

//Global Variable for building course links to OSU website.
let courseSearchURL =[];

//Builds a list of URL strings in 'courseSearchURL' from courses listed on a Profile. 
function BuildCourseLink(array) {
    //ForEach course entry, separate letters/numbers/characters using ASCII
    array.forEach(entry => {
        var upperEntry = entry.toUpperCase();
        var tempLetter = "";
        var tempNumber = "";
        for (let i = 0; i < upperEntry.length; i++) {
            if (upperEntry.charCodeAt(i) >= 65 && upperEntry.charCodeAt(i) <= 90){
                // Character at i is a letter. Append to tempLetter.
                tempLetter = tempLetter+upperEntry[i];
            } else if (upperEntry.charCodeAt(i) >= 48 && upperEntry.charCodeAt(i) <= 57) {
                // Character at i is a number.  Append to tempNumber.
                tempNumber = tempNumber+upperEntry[i];
            }
        }
        // Create search URL for Course
        var tempURL = "https://catalog.oregonstate.edu/search/?search="+tempLetter+"+"+tempNumber;
        // Create Key:Value pair using original course string (entry) and newly created courseURL (tempURL).
        courseSearchURL[entry] = tempURL;
    });
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
    
    // Award Trophy to users with more than X courses
    let awardCourse;
    if (courses.length > 3) {
        awardCourse =  <GrStar className="mb-2" style={ICON_STYLES}/>;
    }
    
    // Build array of URL links from Profile courses array
    BuildCourseLink(courses);

    // Award Trophy to users with more than X skills
    let awardSkills;
    if (skills.length >= 3) {
        awardSkills = <GrStar className="mb-2" style={ICON_STYLES}/>;
    }

    // Display string placeholder when no courses are listed in user profile
    let noCourses;
    if (courses.length == 0) {
        noCourses = " No courses listed |"
    }

    // Display string placeholder when no skills are listed in user profile
    let noSkills;
    if (skills.length == 0) {
        noSkills = " No skills listed |"
    }

    // Display Skills placeholder text when no skills are listed in user profile.
    // Test if database contains 'organization' criteria.
    // Test else if 'organization' is listed as empty String. 
    let noOrganization;
    if (typeof(organization) == 'undefined') {
        noOrganization = " No organization listed"
    } else if (organization == "") {    
        noOrganization = " No organization listed"
    }

    // Display Industry placeholder text when no industry is listed in user profile.
    // Test if database contains 'industry' criteria.
    // Test else if 'industry' is listed as empty String.
    let noIndustry;
    if (typeof(industry) == 'undefined') {
        noIndustry = " No industry listed"
    } else if (industry == "") {
        noIndustry = " No industry listed"
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
        <hr />
            <GitHubUserGistInfo></GitHubUserGistInfo>
        <hr />
            <GitHubUserProjectInfo></GitHubUserProjectInfo>

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
            <div className="container-fluid col-8">
            <div className="text-capitalize col-auto" style={{color: '#343a40'}}>
            <dl className="row border rounded border-warning auto-x">
                <dt className="col-sm-12 col-md-4 col-lg-4 text-md-right">{awardCourse}COURSES</dt>
                <dd className="col-sm-12 col-md-8 col-lg-8 font-italic">| {noCourses}{courses && courses.map(course => <span key={course}><a href={courseSearchURL[course]}>{course} </a> | </span>)}</dd>

                <dt className="col-sm-12 col-md-4 col-lg-4 text-md-right">{awardSkills}SKILLS</dt>
                <dd className="col-sm-12 col-md-8 col-lg-8 font-italic">| {noSkills}{skills && skills.map(skill => <span key={skill}>{skill} | </span>)}</dd>

                <dt className="col-sm-12 col-md-4 col-lg-4 text-md-right">ORGANIZATION</dt>
                <dd className="col-sm-12 col-md-8 col-lg-8 font-italic">| {noOrganization}{organization} |</dd>
            
                <dt className="col-sm-12 col-md-4 col-lg-4 text-md-right">INDUSTRY</dt>
                <dd className="col-sm-12 col-md-8 col-lg-8 font-italic">| {noIndustry}{industry} |</dd>
            </dl>
            </div>
            </div>
            <div className="text-center">
                <a href={"/"}>
                    <Button variant="primary" size="sm" variant="outline-dark" className="py-0 my-2">New Search</Button>
                </a>
            </div>
        </Container>
        </>
    )
}

export default ViewProfile; 