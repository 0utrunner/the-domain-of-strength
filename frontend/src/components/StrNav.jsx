import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from "../api/axios"

function StrNav() {
  const [quote, setQuote] = useState('')

  const logout = () => {
    axios.post('/logout').then((response) => {
        window.location.href = "http://localhost:8000/#/Logout"
    })
  }

  useEffect(() => {
    axios.get("https://stoicquotesapi.com/v1/api/quotes/random")
    .then((response) => {
        setQuote(response.data.body)
    })
  },[])

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand>The Domain of Strength</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#/Home">Exercises</Nav.Link>
            <Nav.Link href="#/History">Records</Nav.Link>
            <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
          </Nav>
          <Navbar.Text className='motivate'>{quote}</Navbar.Text>
        </Container>
      </Navbar>
    </>
  );
}

export default StrNav