import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import {StartButton} from './welcomePage';
import {Link} from 'react-router-dom';

const ErrorName = styled.div`
    font-family: 'Warnes';
    font-size: 35px;
`;

const ErrorDescription = styled(ErrorName)`
    font-size: 28px;
    margin-top: 25px;
`;

const MainButton = styled(StartButton)`
    color: white;
    padding: 20px 50px;
    background: #ba2041;
`

const ErrorPage = () => {
    return (
        <Container className="p-3 mb-2 mt-5">
            <Row className="justify-content-center align-items-center bg-white text-dark">
                <Col className="col-3">
                    <img src="./img/error404.jpg" alt="error"/>   
                </Col>
                <Col className="col-5 text-center">
                    <ErrorName>404 page not found.</ErrorName>
                    <ErrorDescription>I didn't eat it.</ErrorDescription>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="d-flex justify-content-center align-items-center">
                    <Link to="/">
                        <MainButton>To Main Page</MainButton>
                    </Link>
                </Col>
            </Row>
        </Container>
        
    )
}

export default ErrorPage;