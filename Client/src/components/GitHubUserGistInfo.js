import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import gh_comments from "../assets/images/icons/gh_comments.PNG";
import gh_gists from "../assets/images/icons/gh_gists.PNG";

  const ICON_STYLES = {
      height: "20px",
      width: "20px"
  }

function GitHubUserGistInfo() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch("https://api.github.com/users/octocat/gists")
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
                    <span> Loading gists... </span>
                </Col>
            </Row>
        </Container>
      )
    } else {
      return (
        <Container fluid>
        <Row className="mb-2">
            <Col className="text-center"><h5>Gists</h5></Col>
        </Row>
        { data.length !== 0 ?
            <Row className="mb-4">
                <Col></Col>
                <Col xs={10}>
                    <ListGroup>
                        {data.map(gist => (
                            <ListGroup.Item key={gist.id}>
                                <table>
                                    <tbody>
                                      <tr>
                                          <td><a href={gist.html_url} target="_blank" rel="noopener noreferrer">View Gist</a></td>
                                      </tr>
                                      <tr>
                                        <td><img src={gh_gists} alt="" className="mb-1 mr-1" style={ICON_STYLES} />Files:
                                          <ul className="list-unstyled ml-2 mb-0">
                                            {
                                            Object.keys(gist.files).map( (file, index) => ( 
                                              <li key={index}>
                                              <a href={gist.files[file].raw_url } target="_blank" rel="noopener noreferrer">{ gist.files[file].filename }</a>
                                              <Badge className="ml-2" pill variant="warning">{ gist.files[file].language }</Badge>
                                              </li>
                                            ))}
                                          </ul>
                                        </td>
                                      </tr>
                                      <tr>
                                          <td>{gist.description}</td>
                                      </tr>
                                      <tr>
                                          <td>
                                            <span className="mr-2">
                                              <img src={gh_comments} alt="" className="mb-1" style={ICON_STYLES} /> {gist.comments}
                                            </span>
                                          </td>
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
                <Col className="text-center"><h6 className="mb-4">This user has no public gists.</h6></Col>
            </Row> }
        </Container>
      )
    }
  }

export default GitHubUserGistInfo;
