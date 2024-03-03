import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleImage from '../assets/2211.w026.n002.2759B.p1.2759-removebg-preview.png'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectApi } from '../services/allApi'

function Home() {
  //state to store token

  const [isLogin, setIsLogin] = useState(false)

  const [homeProject, setHomeProject] = useState([])

  const getHomeProject = async () => {
    const result = await homeProjectApi()
    console.log(result);
    setHomeProject(result.data)
  }


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(sessionStorage.getItem("token"))
    }
    else {
      setIsLogin("")
    }
  }, [])

  useEffect(() => {
    getHomeProject()
  })

  console.log(isLogin);


  return (
    <>
      <div style={{ width: '100%', height: '100vh' }} className=' bg-success  container-fluid  rounded d-flex align-items-center justify-content-center'>
        <div className=''>
          <Row className=' align-items-center  p-5  '>
            <Col sm={12} md={6} className=' container  '>
              <h1 className=' text-light ' style={{ fontSize: '100px' }}>Project Fair</h1>
              <p>One stop destination for all software developers Project</p>
              {isLogin ?
                <Link to={'/dashboard'} className='btn  btn-success  rounded '>Manage Projects<i class="fa-solid fa-arrow-right ms-3"></i></Link> :
                <Link to={'/login'} className='btn  btn-success  rounded '>Get Started <i class="fa-solid fa-arrow-right ms-3"></i></Link>
              }
            </Col>
            <Col sm={12} md={6} className="d-flex justify-content-center align-items-center">
              <img className=' w-100 img-fluid  ' src={titleImage} alt="no image" />
            </Col>

          </Row>
        </div>
      </div>
      <div className='all-product mt-5 mb-5'>
        <div className='text-center'>
          <h1>Explore Our Projects</h1>

          <marquee scrollAmount={20}>
            <div className=' d-flex '>

              {homeProject?.length>0?
              homeProject?.map((item)=>(
                <div className='ms-5' style={{ width: '500px' }}>
                  <ProjectCard project ={item} />
                </div>))
                :null
              }


            </div>
          </marquee>
          <div className='text-center mt-5'>
            <h3><Link to={'/project'}>See More Project</Link></h3>
          </div>

        </div>
      </div>

    </>

  )
}

export default Home