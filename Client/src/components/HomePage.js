import React from 'react';
import Search from './Search.js';
import { firestore, auth } from '../firebase/firebase';
import { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import { BrowserRouter, Route } from 'react-router-dom'
import { useHistory } from "react-router-dom";


function App() {
    let history = useHistory();

    const dataRef = firestore.collection('users');
    const query = dataRef;
    const [results, setResults] = useState('');
    const [criteria, setCriteria] = useState("start");
    const [loadData, setLoadData] = useState("start");

    const [industry, setIndustry] = useState('any');
    const [organization, setOrganization] = useState('any');
    const [courseSubject, setCourseSubject] = useState('any');
    const [courseNumber, setCourseNumber] = useState('Any Course Number');
    const [skill, setSkill] = useState('any');
    const [freeInput, setFreeInput] = useState('');

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
        setCourseNumber(parseInt(event.target.value, 10));
    }

    const handleSkillChange = (event) => {
        console.log(event.target.value);
        setSkill(event.target.value);
    }

    const handleFreeInputChange = (event) => {
        console.log(event.target.value);
        setFreeInput(event.target.value);
    }

    const navigateToSearchPage = () => {
        history.push(`/search`, {organization, industry, courseSubject, courseNumber, skill, freeInput} )
    }

    // TODO will implement in a future iteration
    // const IndustryToggle = React.forwardRef(({ children, onClick }, ref) => (
    //     <a
    //         href=""
    //         ref={ref}
    //         onClick={(e) => {
    //             e.preventDefault();
    //             onClick(e);
    //             }
    //         }
    //     >
    //     {children}
    //     &#x25bc;
    //     </a>
    // ));      

    // TODO will implement in a future iteration
    // const IndustryMenu = React.forwardRef(
    //     ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
 
    //     return (
    //         <div
    //             ref={ref}
    //             style={style}
    //             className={className}
    //             aria-labelledby={labeledBy}
    //         >
    //         <FormControl
    //             autoFocus
    //             className="mx-3 my-2 w-auto"
    //             placeholder="Choose an Industry"
    //             onChange={(e) => setValue(e.target.value)}
    //             value={value}
    //         />
    //         <ul className="list-unstyled">
    //             {/* <option value={"any"} key={"any"}>Any Industry</option>
    //                 {criteria !== "start" && criteria.industries !== undefined && criteria.industries.map(industry => 
    //             <option value={industry} key={industry}>{industry}</option>)} */}
    //             {React.Children.toArray(children).filter(
    //                 (child) => !value || child.props.children.toLowerCase().startsWith(value.toLowerCase()),
    //             )}
    //         </ul>
    //     </div>
    //     );
    // });

    return (
        <div className="container mt-5">
            <div className="mt-5 mb-5"><br></br></div>
            <h3 className="mt-5 mb-5">Find the <em>Sharpest</em> Tool in the shed.</h3>
            <div className="mt-5 mb-5"><br></br></div>
            <Form onSubmit={navigateToSearchPage}>
                <Form.Row className="mb-2">
                    <Col>
                        <Form.Control
                            className="mb-2"
                            id="inlineFormInput"
                            placeholder="What kind of expert can we help you find?"
                            size="lg"
                            value={freeInput}
                            onChange={handleFreeInputChange}
                        />
                    </Col>
                    <Col>
                        <Button type="submit" variant="primary" size="lg">Search</Button>
                    </Col>
                </Form.Row>

                <p>Need help narrowing your search?</p>

                <Form.Row>
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">Filtering Options</Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>

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

                                    <Form.Group inline controlId="exampleForm.ControlSelect1" >
                                        <Form inline>
                                            <Form.Group controlId="exampleForm.ControlSelect1" >
                                                <Form.Control className="mr-sm-2" value={courseSubject} as="select" onChange={handleCourseSubjectChange}>
                                                    <option value={"any"} key={"any"}>Any Course Subject</option>
                                                        {criteria !== "start" && criteria.courses !== undefined && criteria.courses.map(courseSubject => 
                                                    <option value={courseSubject} key={courseSubject}>{courseSubject}</option>)}
                                                </Form.Control> 

                                                <Form.Control placeholder="Any Course Number" type="text" value={courseNumber} onChange={handleCourseNumberChange}></Form.Control> 
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

                                    
                                    {/* // TODO will implement in a future iteration
                                    <Dropdown>
                                        <Dropdown.Toggle as={IndustryToggle} id="dropdown-custom-components">Advanced Filter Options</Dropdown.Toggle>

                                        <Dropdown.Menu as={IndustryMenu}>
                                        <option value={"any"} key={"any"}>Any Industry</option>
                                            {criteria !== "start" && criteria.industries !== undefined && criteria.industries.map(industry => 
                                                            <option value={industry} key={industry}>{industry}</option>)}
                                        </Dropdown.Menu>

                                        <Dropdown.Menu as={IndustryMenu}>
                                        <option value={"any"} key={"any"}>Any Industry</option>
                                            {criteria !== "start" && criteria.industries !== undefined && criteria.industries.map(industry => 
                                                            <option value={industry} key={industry}>{industry}</option>)}
                                        </Dropdown.Menu>

                                        <Dropdown.Menu as={IndustryMenu}>
                                        <option value={"any"} key={"any"}>Any Industry</option>
                                            {criteria !== "start" && criteria.industries !== undefined && criteria.industries.map(industry => 
                                                            <option value={industry} key={industry}>{industry}</option>)}
                                        </Dropdown.Menu>

                                        <Dropdown.Menu as={IndustryMenu}>
                                        <option value={"any"} key={"any"}>Any Industry</option>
                                            {criteria !== "start" && criteria.industries !== undefined && criteria.industries.map(industry => 
                                                            <option value={industry} key={industry}>{industry}</option>)}
                                        </Dropdown.Menu>
                                    </Dropdown> */}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Form.Row>
            </Form>
        </div>
    );
}

export default App;