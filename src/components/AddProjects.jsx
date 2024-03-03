import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addProjectApi } from '../services/allApi';
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { addProjectResponseContext } from '../Contexts/ContextShare';


function AddProjects() {

  //useContext hook is used to access the context api

  const {addProjectResponse , setAddProjectResponse} =useContext(addProjectResponseContext)


  //state to hold Value
const [projectDetail , setProjectDetails] =useState({
  title:"",
  language:"",
  github:"",
  website:"",
  overview:"",
  projectImage:""
})


  const [show, setShow] = useState(false);

//to hold the url of image
const [preview,setPreview]=useState("")

  console.log(projectDetail);

  useEffect(() => {
    if (projectDetail.projectImage) {
    
      //javascript predefined method- url - createObjectUrl -files will be converted into url 
      setPreview(URL.createObjectURL(projectDetail.projectImage));
    }
  }, [projectDetail.projectImage]);


  const [token, setToken] = useState("");
  
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);
  
  
  // useEffect(()=>{
  //  if(sessionStorage.getItem("token")){
  //   setToken(sessionStorage.getItem("token"))
  //  }
  //  else{
  //   setToken("")
  //  }
  // },[])

  console.log('preview',preview);
  console.log('token:',token);

  const handleClose = () =>{ setShow(false);
  handleClear()
}
  const handleShow = () => setShow(true);
  const handleClear =()=>{
    setProjectDetails({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projectImage:""
    })
    setPreview("")

  }

const handleAdd =async(e)=>{
  e.preventDefault()
  const {title,language,github,website,overview,projectImage} =projectDetail
  if(!title || !language  || !github || !website || !overview || !projectImage){
    toast.info('please fill  the form completely')
  }
  else{
    //reqBody
    //if there is a uploading content from the system .we should send the body in the form of formdata
    //1)create object for the class form Data
    const reqBody=new FormData()
    // 2)add value to the FormData - append()
    reqBody.append("title",title)
    reqBody.append("language",language)
    reqBody.append("github",github)
    reqBody.append("website",website)
    reqBody.append("overview",overview)
    reqBody.append("projectImage",projectImage)
   
   if(token) {
    const reqHeader ={
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`

    }


    const result = await addProjectApi(reqBody,reqHeader)
    console.log('result:',result);
    if(result.status===200){
      toast.success('Project Successfully Added')
      handleClose()
      setAddProjectResponse(result.data)
    }
    else{
      console.log(result);
      toast.error(result.response.data)
    }
  }
}
}

  return (
    <>
     <div> <Link onClick={handleShow} className='btn  btn-success  rounded '>AddProjects </Link></div>
     
<Modal
show={show}
onHide={handleClose} 
backdrop="static"
keyboard={false}
size='lg'
centered
>
<Modal.Header closeButton>
  <Modal.Title>Project Details</Modal.Title>
</Modal.Header>
<Modal.Body>
<div className=' row '>
  <div className=' col-lg-6 '>
    <label>
      <input type="file" style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetail,projectImage:e.target.files[0]})} />
      <img className=' img-fluid ' src={preview?preview:"https://m.media-amazon.com/images/I/71sKzRQtXtL.png"} alt="no image"  />
    </label>
    
    </div>
   <div className=' col-lg-6 justify-content-center  align-items-center  flex-column  '>
      <form className='pt-4'>
    
    
      <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
            
            <Form.Control type="text" placeholder="Project Title" value={projectDetail.title} onChange={(e)=>setProjectDetails({...projectDetail,title:e.target.value})} />
          </Form.Group>
          
      <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
            
            <Form.Control type="text" placeholder="Language Used"  value={projectDetail.language} onChange={(e)=>setProjectDetails({...projectDetail,language:e.target.value})} />
          </Form.Group>
          <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
            
            <Form.Control type="text" placeholder="Github Link" value={projectDetail.github} onChange={(e)=>setProjectDetails({...projectDetail,github:e.target.value})} />
          </Form.Group>
          <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
            
            <Form.Control type="text" placeholder="Website Link" value={projectDetail.website} onChange={(e)=>setProjectDetails({...projectDetail,website:e.target.value})} />
          </Form.Group>
  
          <Form.Group
                className="mb-3 w-100"
                controlId="exampleForm.ControlTextarea1"
              >
                
                <Form.Control as="textarea"placeholder='Project Overview' value={projectDetail.overview} onChange={(e)=>setProjectDetails({...projectDetail,overview:e.target.value})} rows={3} />
              </Form.Group>
          
     
      </form>
</div>
 </div>

</Modal.Body>
<Modal.Footer>
  <Button variant="primary" onClick={handleClear}>
    Clear
  </Button>
  <Button variant="success" onClick={handleAdd} >Add</Button>
</Modal.Footer>
</Modal>
<ToastContainer autoClose={2000} theme='colored ' position='top-center'/>
    </>
  )
}

export default AddProjects