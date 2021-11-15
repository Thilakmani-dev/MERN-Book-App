import { useState } from 'react';
import { Form, Container, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
const RegisterScreen = (props) => {
  const navigate = useNavigate();
  console.log(props);

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [fullName, setfullName] = useState('');
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const registerHandler = (e) => {
    e.preventDefault();
    setloading(true);
    fetch('http://localhost:5000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        fullName: fullName,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        navigate('/');
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
          <Form onSubmit={registerHandler}>
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
            <Form.Group controlId='formBasicFullName'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type='fullName'
                value={fullName}
                placeholder='Enter Full Name'
                onChange={(e) => setfullName(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Register
            </Button>
          </Form>
          <Row className='py-2'>
            <Col>
              Already Have an account ? <Link to='/login'>Login</Link>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
export default RegisterScreen;
