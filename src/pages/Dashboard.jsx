import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Myprojects from '../components/Myprojects'
import Profile from '../components/Profile'

function Dashboard() {
const [username,setUsername]=useState()

useEffect(()=>{
  setUsername(JSON.parse(sessionStorage.getItem('existingUser')).username)
},[])
console.log(username);

  return (
    <>
      
      <Header Dashboard/>

      <h1 className='mt-3 ms-3'>Welcome <span style={{color:'orange'}}>{username}</span></h1>
    
    <Row className=' container-fluid mt-5'>

      {/* my projects */}
      <Col md={8} sm={12}>
        <Myprojects/>

      </Col>
      {/* profile */}
      <Col md={4} sm={12}>
        <Profile/>
        
      </Col>
    
    </Row>

    </>
    )
}

export default Dashboard