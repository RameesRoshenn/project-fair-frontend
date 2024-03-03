import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { Row ,Col } from 'react-bootstrap'
import { allProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'

function Project() {

  const [allProject,setAllProject]=useState([])
  const [searchKey,setSearchKey]=useState('')
  const [isToken,setIsToken]=useState(false)

  const getAllProject =async()=>{


  
      if(sessionStorage.getItem("token")){
        const token = sessionStorage.getItem("token")
        const reqHeader ={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
    const result = await allProjectApi(searchKey,reqHeader)
    console.log(result.data);
    setAllProject(result.data)
  }
 

  }
  console.log(searchKey);

  useEffect(()=>{
getAllProject()
  },[searchKey])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsToken(true)
    }
  })

  return (
   <>
   <Header/>
   <div className='d-flex justify-content-center  align-items-center flex-column mt-5  '>
   <h1 >All Project</h1>
    <div className=' d-flex mt-5 w-25'>
      <input type="text" className='form-control' value={searchKey} onChange={e=>setSearchKey(e.target.value)} placeholder='Search the projects using Technologies' />
      <i style={{marginLeft:'-45px' ,color:'lightgrey'}} class="fa-solid fa-magnifying-glass fa-rotate-90"></i>
    </div>
   </div>
   <Row className='mt-5 mb-5 container-fluid '>
    {allProject?.length>0?
    allProject.map((item)=>( <Col sm={12} md={6} lg={4}>
      <ProjectCard project={item}/>
    </Col>))
   : <div>
    {isToken?<p className='text-danger fs-3  text-center '>Sorry No Projects Currently Available.</p>:
     <div className=' d-flex  justify-content-center  align-items-center flex-column  '>
      <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="" height={'200px'} width={'200px'} />
      <p className='text-danger fs-4 mt-4 '>Please <Link style={{textDecoration:'none' , color:'blue'}} to={'/login'}>login</Link> to view more Projects</p>
     </div>}
    
    </div>
    }
   </Row>
   </>
  
  )
}

export default Project