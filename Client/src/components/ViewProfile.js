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
    height: "22px",
    width: "22px",
    cursor: "pointer"
}

const ICON_STYLES_LINK = {
    color: "inherit"
}

let awardSkills;
let awardCourse;

let noCourses;
let noSkills;
let noOrganization;
let noIndustry;

const trophyIcon = <GrStar className="mb-2" style={ICON_STYLES}/>;
const courseTrophyMinimum = 4; //The minimum courses reequired to be awarded a trophy
const skillTrophyMinimum = 3;  //The minimum skills required to be awarded a trophy


// Award Trophy to users with more than courseTrophyMinimums
function CourseAward(category) {
    if (category.length >= courseTrophyMinimum) {
        awardCourse = trophyIcon;
    }
}

// Award Trophy to users with more than skillsTrophyMinimums
function SkillsAward(category) {
    if (category.length >= skillTrophyMinimum) {
        awardSkills = trophyIcon;
    }
}

// Display Courses placeholder text when no skills are listed in user profile.
function VerifyCourses(category) {
    if (category.length == 0) {
        noCourses = " No courses listed |"
    }
}

// Display Skills placeholder text when no skills are listed in user profile.
function VerifySkills(category) {
    if (category.length == 0) {
        noSkills = " No skills listed |"
    }
}

// Display Organization placeholder text when no organization is listed in user profile.
function VerifyOrganization(category) {
    // Test if database contains 'organization' criteria.
    if (typeof(category) == 'undefined') {
        noOrganization = " No organization listed"
    } else if (category == "") {    
        noOrganization = " No organization listed"
    }
}

// Display Industry placeholder text when no industry is listed in user profile.
function VerifyIndustry(category) {
    // Test if database contains 'industry' criteria.
    if (typeof(category) == 'undefined') {
        noIndustry = " No industry listed"
    } else if (category == "") {
        noIndustry = " No industry listed"
    }
}

//Toggles the 'Endorse Expert' button off;
//Conditions for Off; User not signed in || User viewing own profile.
function endroseButtonOff() {
    document.getElementById('endorseButton').style.display = 'none';
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
    
    // />;
    
    BuildCourseLink(courses);
    CourseAward(courses);
    SkillsAward(skills);

    VerifyCourses(courses);
    VerifySkills(skills);
    VerifyOrganization(organization);
    VerifyIndustry(industry);

    // Resource: https://www.youtube.com/watch?v=SmMZqh1xdB4
    const popupRef = React.useRef();

    const openPopupPreview = () => {
        popupRef.current.openPopup();
    };

    if (loggedIn === "start") {
        auth.onAuthStateChanged(function(user) {
            if (user) {
                setLoggedIn("true");
                var signedInUid = auth.currentUser['uid'];
                if (signedInUid === uid) {
                    //Signed In User is viewing own profile; Do not display Endorse Button
                    endroseButtonOff();
                };
            } else {
                setLoggedIn("false");
                //No User is signed in; Do no display Endorse Button
                endroseButtonOff();
            }
        })
    }

    return (

        <>
        <Popup ref={popupRef}>

        <GitHubUserInfo data={gitHub} />
        <hr />
        <GitHubUserRepoInfo data={gitHub} />
        <hr />
        <GitHubUserGistInfo data={gitHub} />
        <hr />
        <GitHubUserProjectInfo data={gitHub} />

        </Popup>
        
        <Container className="mt-5">
            <Row className="justify-content-center pb-2">
                <Col xs={1} md={1}></Col>
                <Col className="text-right" xs={3} md={4}>
                    <Image className="mt-2" src={photoURL} alt="" width={125} height={125} roundedCircle/><br />
                </Col>
                <Col className="text-left font-italic pl-4" style={{color: '#343a40'}} xs={7} md={6}>
                    <h1 className="mb-0 pb-0 pl-1">{displayName}</h1>
                    <span className="my-2 text-info pl-3">{email}</span><br />
                    <span className="pl-3">
                        { linkedIn !== "" ? 
                        <a href={"https://www.linkedin.com/in/" + linkedIn}  target="_blank" rel="noopener noreferrer" style={ICON_STYLES_LINK}>
                            <GrLinkedin className="mr-3 my-2" style={ICON_STYLES}/>
                        </a>
                        : "" }
                        { twitter !== "" ?
                        <a href={"https://twitter.com/" + twitter}  target="_blank" rel="noopener noreferrer" style={ICON_STYLES_LINK}>
                            <GrTwitter className="mr-3 my-2" style={ICON_STYLES}/> 
                        </a>
                        : "" }
                        { gitHub !== "" ?
                        <a href={"https://github.com/" + gitHub}  target="_blank" rel="noopener noreferrer" style={ICON_STYLES_LINK}>
                            <GrGithub className="mr-3 my-2" style={ICON_STYLES}/>
                        </a>
                        : "" }
                        { gitHub !== "" ?
                            <Button variant="primary" size="sm" variant="outline-dark" className="py-0" onClick={() => openPopupPreview()}>
                                GitHub Preview
                            </Button>
                        : "" }
                    </span>
                </Col>
                <Col xs={1} md={1}></Col>
            </Row>
            <div className="container-fluid col-8">
            <div className="text-capitalize col-auto border rounded border-warning mt-2" style={{color: '#343a40'}}>
            <dl className="row auto-x mb-0">
                <dt className="col-sm-12 col-md-4 col-lg-4 text-md-right">{awardCourse}COURSES</dt>
                <dd className="col-sm-12 col-md-8 col-lg-8 font-italic">| {noCourses}{courses && courses.map(course => <span key={course}><a href={courseSearchURL[course]}>{course} </a> | </span>)}</dd>

                <dt className="col-sm-12 col-md-4 col-lg-4 text-md-right">{awardSkills}SKILLS</dt>
                <dd className="col-sm-12 col-md-8 col-lg-8 font-italic">| {noSkills}{skills && skills.map(skill => <span key={skill}>{skill} | </span>)}</dd>

                <dt className="col-sm-12 col-md-4 col-lg-4 text-md-right">ORGANIZATION</dt>
                <dd className="col-sm-12 col-md-8 col-lg-8 font-italic">| {noOrganization}{organization} |</dd>
            
                <dt className="col-sm-12 col-md-4 col-lg-4 text-md-right">INDUSTRY</dt>
                <dd className="col-sm-12 col-md-8 col-lg-8 font-italic">| {noIndustry}{industry} |</dd>
            </dl>
                <div className="justify-content-center d-flex">
                    <a href={"/"}>
                        <Button  id="endorseButton" variant="primary" size="sm" variant="outline-dark" className="py-0 my-2" href={`/endorse/${uid}`}>Endorse Expert</Button>
                    </a>
                </div>
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