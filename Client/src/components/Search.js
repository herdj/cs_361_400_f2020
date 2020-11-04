import React from 'react';
import { firestore, auth } from '../firebase/firebase';
import { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import firebase from 'firebase/app';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';

function Search() {
    const dataRef = firestore.collection('users');
    const query = dataRef;
    const [results, setResults] = useState('');
    const [criteria, setCriteria] = useState("start");
    const [loadData, setLoadData] = useState("start");
    const [industry, setIndustry] = useState('any');
    const [organization, setOrganization] = useState('any');
    const [courseSubject, setCourseSubject] = useState('any');
    const [courseNumber, setCourseNumber] = useState('any');
    const [skill, setSkill] = useState('any');

    const [userProfiles] = useCollectionData(query, { idField: 'id' });

    useEffect(() => {
        const getCriteriaLookups = async () => {
                await firestore.collection('criteria').doc('lookups').get().then(function(doc) {
                    setCriteria(doc.data());
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
        setCourseNumber(parseInt(event.target.value, 10));
    }

    const handleSkillChange = (event) => {
        console.log(event.target.value);
        setSkill(event.target.value);
    }

    const onSearch = (event) => {
        event.preventDefault();

        if (courseSubject !== 'any' && courseNumber !== null && !courseNumber > 0) {
            alert("Course Number must be an integer");
        }
        else {
            setResults('');
            var searchCourse = courseSubject + ' ' + courseNumber
            userProfiles.map(profile => {
                if ((industry === profile.industry || industry === 'any') && (organization === profile.organization || organization === 'any') &&
                    (Array.isArray(profile.courses) && profile.courses.length && profile.courses.indexOf(searchCourse) > -1 || courseSubject === 'any') && 
                    (Array.isArray(profile.skill) && profile.skill.length && profile.skill.indexOf(skill) > -1 || skill === 'any')) {
                    setResults(results => [...results, profile]);
                    console.log(profile);
                }
            });
            setLoadData(results);
        }
    }
    
    return (
        <div className="container mt-4">
            <h3>Filter Options</h3>
            <Form onSubmit={onSearch}>
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
                    {criteria !== "start" && criteria.organization !== undefined && criteria.organization.map(organization => 
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

                            <Form.Control placeholder="Any Course Number" type="text" onChange={handleCourseNumberChange}></Form.Control> 
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


                <Button variant="primary" type="submit">Submit</Button>
            </Form>

            <div>
                {results && results.map(profile => <ProfileData key={profile.id} data={profile} />)}
            </div>
        </div>
    );

}

function ProfileData(props) {
    const { displayName, courses, skills, photoURL, uid, industry} = props.data;

    return (  
        <ul className="list-group pt-3">
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
                            <strong>Courses: </strong>
                            {courses && courses.map(course => <span key={course}>{course} | </span>)}
                        </div>
                        <div className="pt-1 pl-2">
                            <strong>Skills: </strong>
                            {skills && skills.map(skill => <span key={skill}>{skill} | </span>)}
                        </div>
                        <div className="pt-1 pl-2">
                            <strong>Industry: </strong>
                            {industry !== undefined ? <span key={industry}>{industry}</span> : ""}
                        </div>
                    </div>
                </div>
            </li>
        </ul> 
    );
}

export default Search;  