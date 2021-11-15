import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Row,
  Container,
  Col,
  Table,
} from 'react-bootstrap';

const MyBooks = () => {
  function getUser() {
    const userInfo = localStorage.getItem('userInfo');
    console.log(userInfo);
  }
  function handleLogout() {
    localStorage.removeItem('userInfo');
  }
  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then((res) => res.json())
      .then((res) => setbooks(res))
      .catch((err) => console.log('error while getting books', err));
  }, []);
  const [bookId, setbookId] = useState(0);
  const [bookTitle, setbookTitle] = useState('');
  const [bookDescription, setbookDescription] = useState('');
  const [books, setbooks] = useState([]);
  const addBook = (e) => {
    e.preventDefault();
    const newbook = {
      bookId: bookId,
      bookTitle: bookTitle,
      bookDescription: bookDescription,
    };
    fetch('http://localhost:5000/books/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newbook),
    })
      .then((res) => res.json())
      .then((res) => console.log('book posted successfully', res))
      .catch((err) => console.log('error created while adding book', err));
  };

  const deleteHandler = (book) => {
    let editedBook = {
      id: book._id,
      data: {
        ...book,
        deleted: true,
      },
    };
    fetch('http://localhost:5000/books/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedBook),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const editHandler = (id) => {};
  return (
    <>
      <Navbar bg='dark' variant='dark' className='justify-content-around px-5'>
        <Navbar.Brand href='#home'>MY BOOKS</Navbar.Brand>
        <Nav>
          <NavDropdown title='Profile' id='basic-nav-dropdown'>
            <NavDropdown.Item>{getUser()}</NavDropdown.Item>
            <NavDropdown.Item>
              <Button onClick={handleLogout}>Logout</Button>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
      <Container
        className='my-1 mx-auto py-1 px-auto'
        style={{
          width: '50%',
          backgroundColor: '#0336FF',
          color: 'white',
          fontWeight: 'bolder',
          borderWidth: '1px',
          borderRadius: '15px',
        }}
      >
        <form onSubmit={addBook}>
          <Row className='m-1 p-1'>
            <Col>
              <label>Book ID:</label>
            </Col>
            <Col>
              <input
                type='number'
                value={bookId}
                onChange={(e) => setbookId(e.target.value)}
                required
                style={{ borderWidth: '1px', borderRadius: '5px' }}
              />
            </Col>
          </Row>
          <Row className='m-1 p-1'>
            <Col>
              <label>Book Title:</label>
            </Col>
            <Col>
              <input
                type='text'
                value={bookTitle}
                onChange={(e) => setbookTitle(e.target.value)}
                required
                style={{ borderWidth: '1px', borderRadius: '5px' }}
              />
            </Col>
          </Row>
          <Row className='m-1 p-1'>
            <Col>
              <label>Book Description:</label>
            </Col>
            <Col>
              <input
                type='text'
                value={bookDescription}
                onChange={(e) => setbookDescription(e.target.value)}
                required
                style={{ borderWidth: '1px', borderRadius: '5px' }}
              />
            </Col>
          </Row>
        </form>
      </Container>
      <Row>
        <Col sm={10} className='my-1 mx-auto'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>EMPLOYEE ID</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>MOBILE</th>
                <th>CITY</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0
                ? books
                    .filter((employee) => employee.deleted === false)
                    .map((employee) => (
                      <tr key={employee.empId}>
                        <td>{employee.empId}</td>
                        <td>{employee.firstname}</td>
                        <td>{employee.lastname}</td>
                        <td>{employee.mobile}</td>
                        <td>{employee.city}</td>
                        <td>
                          <Button
                            variant='primary'
                            onClick={() => editHandler(employee._id)}
                          >
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant='danger'
                            onClick={() => deleteHandler(employee)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                : null}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default MyBooks;
