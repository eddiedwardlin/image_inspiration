import { useState } from "react";
import { useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "../styles/History.css"

function History () {
    const location = useLocation();
    const { data } = location.state;
    const [showLikes, setShowLikes] = useState(true);

    return <>
        <div className="toggle-container">
            <Button variant="dark" onClick={() => setShowLikes(!showLikes)}>{showLikes ? "Likes" : "Dislikes"}</Button>
        </div>
        <Container>
            <Row>
                {showLikes && (data.likes.length > 0 ? (
                    data.likes.map((url: string) => (
                        <Col md={3} className="d-flex justify-content-center align-items-center">
                            <Image key={url} className="image" src={url} rounded />
                        </Col>
                    ))
                ) : (
                    <Col md={12} className="d-flex justify-content-center align-items-center">
                        <p className="mt-5">No images</p>
                    </Col>
                ))}
                {!showLikes && (data.dislikes.length > 0 ? (
                    data.dislikes.map((url: string) => (
                        <Col md={3} className="d-flex justify-content-center align-items-center">
                            <Image key={url} className="image" src={url} rounded />
                        </Col>
                    ))
                ) : (
                    <Col md={12} className="d-flex justify-content-center align-items-center">
                        <p className="mt-5">No images</p>
                    </Col>
                ))}
            </Row>
        </Container>
    </>
}

export default History;