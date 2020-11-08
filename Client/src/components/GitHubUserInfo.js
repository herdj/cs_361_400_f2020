import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Figure from "react-bootstrap/Figure";
import FigureImage from "react-bootstrap/FigureImage";
import Spinner from "react-bootstrap/Spinner";
import gh_mark from "../assets/images/GitHub-Mark-120px-plus.png";
import gh_followers_icon from "../assets/images/icons/gh_followers.PNG";
import gh_location_icon from "../assets/images/icons/gh_location.PNG";
import gh_company_icon from "../assets/images/icons/gh_company.PNG";
import gh_blog_icon from "../assets/images/icons/gh_blog.PNG";

  const ICON_STYLES = {
      height: "20px",
      width: "20px"
  }

  const ICON_STYLES_ALT = {
    height: "23px",
    width: "23px"   
  }

function GitHubUserInfo() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch("https://api.github.com/users/octocat")
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
                    <Spinner animation="border" />
                    <span> Loading... </span>
                </Col>
            </Row>
        </Container>
      )
    } else {
      return (
        <>
        <Container fluid>
            <Row>
                <Col className="text-center">
                    <Image src={data.avatar_url} alt="" width={120} height={120} roundedCircle/>
                </Col>
            </Row>
            <Row>
                <Col className="text-center"><h1>{data.login}</h1></Col>
            </Row>
            { data.name !== null ?
            <Row className="mb-2">
                <Col className="text-center">{data.name}</Col>
            </Row>
            : "" }
            <Row className="mb-2">
                <Col className="text-center">
                    <Button href={data.html_url} target="_blank" size="sm" variant="outline-dark">
                        Visit Profile
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col className="text-center">
                    <img src={gh_followers_icon} alt="" style={ICON_STYLES_ALT} />
                    <b> {data.followers}</b><span className="text-secondary"> followers</span>
                    <span> &#183; </span>
                    <b>{data.following}</b><span className="text-secondary"> following</span>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col className="text-center">
                    { data.location !== null ?
                    <span className="mx-2">
                        <img src={gh_location_icon} alt="" style={ICON_STYLES} /> {data.location}
                    </span>
                    : "" }
                    { data.company !== null ?
                    <span className="mx-2">
                        <img src={gh_company_icon} alt="" style={ICON_STYLES} /> {data.company}
                    </span>
                    : "" }
                    { data.blog !== "" ?
                    <span className="mx-2">
                        <img src={gh_blog_icon} alt="" style={ICON_STYLES} />
                        <a href={data.blog} target="_blank"> {data.blog} </a>
                    </span>
                    : "" }
                </Col>
            </Row>
            { data.bio !== null ?
            <Row className="mb-2">
                <Col className="text-center">{data.bio}</Col>
            </Row>
            : "" }
        </Container>
        </>
      )
    }
  }

export default GitHubUserInfo;