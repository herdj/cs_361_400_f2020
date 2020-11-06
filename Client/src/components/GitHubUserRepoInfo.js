import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import gh_star from "../assets/images/icons/gh_star.PNG";
import gh_forks from "../assets/images/icons/gh_forks.PNG";

  const ICON_STYLES = {
      height: "20px",
      width: "20px"
  }

function GitHubUserRepoInfo() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch("https://api.github.com/users/octocat/repos")
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
                    <span> Loading repositories... </span>
                </Col>
            </Row>
        </Container>
      )
    } else {
      return (
        <Container fluid>
        <Row className="mb-2">
            <Col className="text-center"><h5>Repositories</h5></Col>
        </Row>
        { data.length !== 0 ?
            <Row className="mb-4">
                <Col></Col>
                <Col xs={10}>
                    <ListGroup>
                        {data.map(repo => (
                            <ListGroup.Item key={repo.id}>
                                <table>
                                    <tr>
                                        <td><a href={repo.html_url}>{repo.name}</a></td>
                                    </tr>
                                    <tr>
                                        <td>{repo.description}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            { repo.language !== null ?
                                                <span className="mr-2">{repo.language}</span>
                                            : "" }
                                            <span className="mr-2">
                                                <img src={gh_star} alt="" style={ICON_STYLES} /> {repo.stargazers_count}
                                            </span>
                                            <span className="mr-2">
                                                <img src={gh_forks} alt="" style={ICON_STYLES} /> {repo.forks_count}
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col></Col>
            </Row>
        :   <Row>
                <Col className="text-center"><h6>This user has no public repositories.</h6></Col>
            </Row> }
        </Container>
      )
    }
  }

export default GitHubUserRepoInfo;