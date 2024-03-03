import React from 'react'
// import projectImage from '../assets/React App - Google Chrome 24-11-2023 06_23_34 PM.png'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row ,Col } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';

function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
   <>
    <Card className=' shadow  text-center btn mb-3 ' onClick={handleShow}>
      <Card.Img variant="top" height={'250px'} src={`${BASE_URL}/uploads/${project.projectImage}`} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        
      </Card.Body>
    </Card>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img width={'100%'} height={'250px'} src={`${BASE_URL}/uploads/${project.projectImage}`} alt="no image" />
            </Col>
            <Col md={6}>
              <h4>{project.title}</h4>
              <p>{project.overview}</p>
              <p><span className=' fw-bolder '>Technologies:</span>{project.language}</p>
            </Col>
          </Row>
          <div className='d-flex mt-5 mb-5'>
            <a href={project.github} target='_blank' style={{color:'black'}}><i class="fa-brands fa-github fa-2x ms-3"></i></a>
            <a href={project.website} target='_blank' style={{color:'black'}}><i class="fa-solid fa-link fa-2x ms-5"></i></a>
          </div>
        </Modal.Body>
       
      </Modal>

    </>
  
  )
}

export default ProjectCard