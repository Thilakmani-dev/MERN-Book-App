import { useState, useEffect } from 'react';
import { Form, Container, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
const LoginScreen = (props) => {
  const navigate = useNavigate();
  console.log(props);
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate('/mybooks');
    }
  }, [navigate]);

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const loginHandler = (e) => {
    e.preventDefault();
    setloading(true);
    fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // localStorage.setItem('userInfo', JSON.stringify(res));
      })
      .catch((err) => seterror(err));
    setloading(false);
  };
  return (
    <Container>
      {loading ? (
        <Spinner animation='border' variant='primary' />
      ) : (
        <>
          {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
          <Form onSubmit={loginHandler}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                value={email}
                placeholder='Enter Email'
                onChange={(e) => setemail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                placeholder='Enter Password'
                onChange={(e) => setpassword(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Login
            </Button>
          </Form>
          <Row className='py-2'>
            <Col>
              New User ? <Link to='/register'>Register Here</Link>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
export default LoginScreen;
