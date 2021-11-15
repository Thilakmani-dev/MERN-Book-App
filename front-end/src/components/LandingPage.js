import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Container>
      <h1>Welcome to book management system</h1>
      <Row>
        <Col>
          <h4>If you have an account</h4>
        </Col>
        <Col>
          <Link to='/login' style={{ textDecoration: 'none' }}>
            LOGIN
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Register an account</h4>
        </Col>
        <Col>
          <Link to='/register' style={{ textDecoration: 'none' }}>
            REGISTER
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
