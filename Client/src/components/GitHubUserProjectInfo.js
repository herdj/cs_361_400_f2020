import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import gh_projects from "../assets/images/icons/gh_projects.PNG";

  const ICON_STYLES = {
      height: "20px",
      width: "20px"
  }

function GitHubUserProjectInfo() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch("https://api.github.com/users/octocat/projects",
        {
            headers: {
                "Accept": "application/vnd.github.inertia-preview+json"
            }
        })
        .then(res => res.json())                                      
        .then(
          (result) => {
            setIsLoaded(true);
            setData(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return (
        <Container fluid>
            <Row>
                <Col className="text-center">Error: {error.message}</Col>
            </Row>
        </Container>   
      )
    } else if (!isLoaded) {
      return (
        <Container fluid>
            <Row>
                <Col className="text-center">
                    <span> Loading projects... </span>
                </Col>
            </Row>
        </Container>
      )
    } else {
      return (
        <Container fluid>
        <Row className="mb-2">
            <Col className="text-center"><h5>Projects</h5></Col>
        </Row>
        { data.length !== 0 ?
            <Row className="mb-4">
                <Col></Col>
                <Col xs={10}>
                    <ListGroup>
                        {data.map(repo => (
                            <ListGroup.Item key={repo.id}>
                                <table>
                                    <tbody>
                                      <tr>
                                          <td><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></td>
                                      </tr>
                                      <tr>
                                          <td>{repo.body}</td>
                                      </tr>
                                      <tr>
                                          <td><img src={gh_projects} alt="" style={ICON_STYLES} /> {repo.state} </td>
                                      </tr>
                                    </tbody>
                                </table>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col></Col>
            </Row>
        :   <Row>
                <Col className="text-center"><h6 className="mb-4">This user has no public projects.</h6></Col>
            </Row> }
        </Container>
      )
    }
  }

export default GitHubUserProjectInfo;
