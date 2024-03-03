import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../Contexts/ContextShare';

function Header({Dashboard}) {


  const {isAuthToken,setIsAuthToken} =useContext(isAuthTokenContext)
  const navigate =useNavigate()
const handleLogout =()=>{
  sessionStorage.removeItem("token")
  sessionStorage.removeItem("existingUser")
  setIsAuthToken(false)
  navigate('/')

}

  return (
    <Navbar className="bg-success">
        <Container>
          <Navbar.Brand className=' text-light '>
          <Link to={'/'} style={{textDecoration:'none'}}>
              <i class="fa-brands fa-stack-overflow fa-3x "></i>{''}
              <span className='fs-3 ms-3'> Project Fair</span>
          </Link>
          </Navbar.Brand>
          {
            Dashboard &&
            <button onClick={handleLogout} className=' btn btn-warning  rounded '>Logout  <i class="fa-solid fa-power-off"></i></button>
          }
        </Container>
      </Navbar>
  )
}

export default Header