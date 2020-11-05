import React from 'react';
import { firestore, auth } from '../firebase/firebase';
import { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import { BrowserRouter, Route } from 'react-router-dom'
import { useHistory } from "react-router-dom";


function Search(props) {
    const dataRef = firestore.collection('users');
    const query = dataRef;
    const [results, setResults] = useState('');
    const [criteria, setCriteria] = useState("start");
    const [loadData, setLoadData] = useState("start");
    const [industry, setIndustry] = useState(props.location.state.industry);
    const [organization, setOrganization] = useState(props.location.state.organization);
    const [courseSubject, setCourseSubject] = useState(props.location.state.courseSubject);
    const [courseNumber, setCourseNumber] = useState(props.location.state.courseNumber);
    const [skill, setSkill] = useState(props.location.state.skill);
    const [freeInput, setFreeInput] = useState(props.location.state.freeInput);

    const [userProfiles] = useCollectionData(query, { idField: 'id' });

    useEffect(() => {
        const getCriteriaLookups = async () => {
                await firestore.collection('criteria').doc('lookups').get().then(function(doc) {
                    var data = doc.data();
                    data.industries.sort();
                    data.organizations.sort();
                    data.courses.sort();
                    data.skills.sort();
                    setCriteria(data);
                }).catch(function(error) {
                    console.log("error getting data: ", error);
                })
        }
        getCriteriaLookups();
    },[loadData]);

    const handleIndustryChange = (event) => {
        console.log(event.target.value);
        setIndustry(event.target.value);
    }

    const handleOrganizationChange = (event) => {
        console.log(event.target.value);
        setOrganization(event.target.value);
    }

    const handleCourseSubjectChange = (event) => {
        console.log(event.target.value);
        setCourseSubject(event.target.value);
    }

    const handleCourseNumberChange = (event) => {
        console.log(event.target.value);
        if (event.target.value.length === 0) {
            setCourseNumber("Any Course Number");
        }
        else {
            setCourseNumber(parseInt(event.target.value, 10));
        }
    }

    const handleSkillChange = (event) => {
        console.log(event.target.value);
        setSkill(event.target.value);
    }

    const handleFreeInputChange = (event) => {
        console.log(event.target.value);
        setFreeInput(event.target.value);
    }

    const onSearch = (event) => {
        event.preventDefault();

        if (courseNumber !== "Any Course Number" && !(courseNumber.toString().length === 3)) {
            alert("Course Number must be a valid 3 digit integer");
        }
        else {
            setResults('');
            var searchCourse = courseSubject + ' ' + courseNumber
            userProfiles.map(profile => {

                var profileDisplayName = profile.displayName.toLowerCase();
                var profileOrganization = profile.organization !== null && profile.organization !== undefined ? profile.organization.toLowerCase() : '';
                var profileIndustry = profile.industry !== null && profile.industry !== undefined ? profile.industry.toLowerCase() : '';

                var userInput = freeInput.toLowerCase();

                var validCoursesArray = Array.isArray(profile.courses) && profile.courses.length > 0;
                var validSkillsArray = Array.isArray(profile.skills) && profile.skills.length > 0;
                var organizationIsDefault = organization === 'any';
                var industryIsDefault = industry === 'any';
                var courseSubjectIsDefault = courseSubject === 'any';
                var courseNumberIsDefault = courseNumber === 'Any Course Number' || courseNumber === null || courseNumber === undefined || isNaN(courseNumber);
                var courseIsDefault = courseSubjectIsDefault && courseNumberIsDefault;
                var containsMatchingCourse = validCoursesArray ? profile.courses.indexOf(searchCourse) > -1 : false;
                var containsMatchingCourseNumber = courseSubjectIsDefault && !courseNumberIsDefault ? profile.courses.some(v => v.includes(courseNumber.toString())) : false;
                var containsMatchingSkills = validSkillsArray ? profile.skills.indexOf(skill) > -1 : false;
                var skillIsDefault = skill === 'any';
                var containsMatchingCoursesToUserInput = validCoursesArray ? profile.courses.some(v => v.toLowerCase().includes(userInput)) : false;
                var containsMatchingSkillsToUserInput = validSkillsArray ? profile.skills.some(v => v.toLowerCase().includes(userInput)) : false;
                var emptyUserInput = freeInput === '';
                var validUserInput = freeInput !== '';

                if ((industryIsDefault || industry === profile.industry) && 
                    (organizationIsDefault || organization === profile.organization) &&
                    (courseIsDefault || containsMatchingCourse || containsMatchingCourseNumber) &&
                    (skillIsDefault || containsMatchingSkills) &&
                    (emptyUserInput || 
                    (validUserInput && 
                        (containsMatchingCoursesToUserInput || 
                        containsMatchingSkillsToUserInput ||
                        userInput === profileOrganization || 
                        userInput === profileIndustry || 
                        userInput === profileDisplayName)))) {
                    setResults(results => [...results, profile]);
                    console.log(profile);
                }
            });
            setLoadData(results);
        }
    }
    
    return (
        <div className="container mt-4">
            <h3>Search Options</h3>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control value={industry} as="select" onChange={handleIndustryChange}>
                <option value={"any"} key={"any"}>Any Industry</option>
                    {criteria !== "start" && criteria.industries !== undefined && criteria.industries.map(industry => 
                <option value={industry} key={industry}>{industry}</option>)}
                </Form.Control> 
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control value={organization} as="select" onChange={handleOrganizationChange}>
                <option value={"any"} key={"any"}>Any Organization</option>
                    {criteria !== "start" && criteria.organizations !== undefined && criteria.organizations.map(organization => 
                <option value={organization} key={organization}>{organization}</option>)}
                </Form.Control> 
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1" >
                <Form inline>
                    <Form.Group controlId="exampleForm.ControlSelect1" >
                        <Form.Control className="mr-sm-2" value={courseSubject} as="select" onChange={handleCourseSubjectChange}>
                        <option value={"any"} key={"any"}>Any Course Subject</option>
                            {criteria !== "start" && criteria.courses !== undefined && criteria.courses.map(courseSubject => 
                        <option value={courseSubject} key={courseSubject}>{courseSubject}</option>)}
                        </Form.Control> 

                        <Form.Control placeholder={courseNumber} type="text" onChange={handleCourseNumberChange}></Form.Control> 
                    </Form.Group>
                </Form>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control value={skill} as="select" onChange={handleSkillChange}>
                <option value={"any"} key={"any"}>Any Skill</option>
                {criteria !== "start" && criteria.skills !== undefined && criteria.skills.map(skill => 
                                <option value={skill} key={skill}>{skill}</option>)}
                </Form.Control> 
            </Form.Group>

            <Form onSubmit={onSearch}>
                <Form.Row className="mb-2">
                    <Col>
                        <p>Or search on your own terms!</p>
                        <Form.Control
                            className="mb-2"
                            id="inlineFormInput"
                            placeholder="What are you looking for?"
                            size="lg"
                            value={freeInput}
                            onChange={handleFreeInputChange}
                        />
                    </Col>
                </Form.Row>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>

            <div>
                {results && results.map(profile => <ProfileData key={profile.id} data={profile} />)}
            </div>
        </div>
    );
}

function ProfileData(props) {
    const { displayName, courses, skills, photoURL, uid, industry, organization} = props.data;

    return (  
        <ul className="list-group pt-3 pb-3">
            <li className="list-group-item">
                <div className="media row-3 justify-content-center">
                    <div>
                    <a href={`view-profile/${uid}`}>
                        <img style={{border: "3px solid black"}} src={photoURL} className="align-self-center mr-3" alt="Avatar" />
                    
                        <div className="text-center pr-3">
                            View Profile
                        </div>
                    </a>
                    </div>
                    <div className="media-body">
                        <h5>{displayName}</h5>
                        <div className="pt-1 pl-2">
                            <strong>Industry: </strong>
                            {industry !== undefined ? <span key={industry}>{industry}</span> : ""}
                        </div>
                        <div className="pt-1 pl-2">
                            <strong>Organization: </strong>
                            {organization !== undefined ? <span key={organization}>{organization}</span> : ""}
                        </div>
                        <div className="pt-1 pl-2">
                            <strong>Courses: </strong>
                            {courses && courses.map(course => <span key={course}>{course} | </span>)}
                        </div>
                        <div className="pt-1 pl-2">
                            <strong>Skills: </strong>
                            {skills && skills.map(skill => <span key={skill}>{skill} | </span>)}
                        </div>
                    </div>
                </div>
            </li>
        </ul> 
    );
}

export default Search;  