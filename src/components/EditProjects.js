import React, { useContext, useEffect, useState } from 'react'

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BASE_URL } from '../services/baseurl';
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { editProjectApi } from '../services/allApi';
import { editProjectResponseContext } from '../Contexts/ContextShare';

function EditProjects({project}) {

    
  const  {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
  const [show, setShow] = useState(false);
 
  const [preview,setPreview]=useState("")



   
const [projectDetail , setProjectDetails] =useState({
  id:project._id,
  title:project.title,
  language:project.language,
  github:project.github,
  website:project.website,
  overview:project.overview,
  projectImage:""
})
    const handleClose = () =>{ setShow(false);
      handleClose1()
      }
        const handleShow = () => setShow(true);

        console.log(project);

        useEffect(() => {
          if (projectDetail.projectImage) {
          
            setPreview(URL.createObjectURL(projectDetail.projectImage));
          }
        }, [projectDetail.projectImage]);
      

        //to remove only the edited content
    const    handleClose1 =()=>{
          setProjectDetails({
            title:project.title,
            language:project.language,
            github:project.github,
            website:project.website,
            overview:project.overview,
            projectImage:""
          })
          setPreview("")
        }
       
        const handleUpdate =async()=>{
          const {id,title ,language ,github , website,overview ,projectImage}=projectDetail

          if(!title || !language  || !github || !website || !overview ){
            toast.info('please fill  the form completely')

          }else{
            const reqBody=new FormData()
            reqBody.append("title",title)
            reqBody.append("language",language)
            reqBody.append("github",github)
            reqBody.append("website",website)
            reqBody.append("overview",overview)
          preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
           
          const token =sessionStorage.getItem("token")

          if(preview){
            const reqHeader ={
              "Content-Type":"multipart/form-data",
              "Authorization":`Bearer ${token}`
        
            }
            const result =await editProjectApi(id,reqBody,reqHeader)
            console.log(result);

            if(result.status ===200){
              console.log(result.data);
              toast.success('updated successfully')
              handleClose()
              setEditProjectResponse(result.data)
            }
            else{
              console.log(result.response.data);

            }
        
          }else{
            const reqHeader ={
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
        
            }
            const result =await editProjectApi(id,reqBody,reqHeader)
            
            console.log(result);
            if(result.status ===200){
              console.log(result.data);
              toast.success('updated successfully')
              handleClose()
              setEditProjectResponse(result.data)
            }
            else{
              console.log(result.response.data);

            }
            
          }
          }
        }
       
  return (

    
    <>
        
        <button className="btn " onClick={handleShow}><i class="fa-solid fa-pen-to-square text-info "></i></button>
        <Modal
show={show}
onHide={handleClose} 
backdrop="static"
keyboard={false}
size='lg'
centered
>
<Modal.Header closeButton>
  <Modal.Title>Edit Project Details</Modal.Title>
</Modal.Header>
<Modal.Body>
<div className=' row '>
  <div className=' col-lg-6 '>
    <label>
      <input type="file" style={{display:'none'}}  onChange={(e)=>setProjectDetails({...projectDetail,projectImage:e.target.files[0]})} />
      <img className=' img-fluid '  src={preview?preview:`${BASE_URL}/uploads/${project.projectImage}`} alt="no image"  />
    </label>
    
    </div>
   <div className=' col-lg-6 justify-content-center  align-items-center  flex-column  '>
      <form className='pt-4'>
    
    
      <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
            
            <Form.Control type="text" placeholder="Project Title" value={projectDetail.title} onChange={(e)=>setProjectDetails({...projectDetail,title:e.target.value})}  />
          </Form.Group>
          
      <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
            
            <Form.Control type="text" placeholder="Language Used"  value={projectDetail.language} onChange={(e)=>setProjectDetails({...projectDetail,language:e.target.value})}   />
          </Form.Group>
          <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
            
            <Form.Control type="text" placeholder="Github Link" value={projectDetail.github} onChange={(e)=>setProjectDetails({...projectDetail,github:e.target.value})}  />
          </Form.Group>
          <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
            
            <Form.Control type="text" placeholder="Website Link" value={projectDetail.website} onChange={(e)=>setProjectDetails({...projectDetail,website:e.target.value})} />
          </Form.Group>
  
          <Form.Group
                className="mb-3 w-100"
                controlId="exampleForm.ControlTextarea1"
              >
                
                <Form.Control as="textarea"placeholder='Project Overview' value={projectDetail.overview} onChange={(e)=>setProjectDetails({...projectDetail,overview:e.target.value})}  rows={3} />
              </Form.Group>
          
     
      </form>
</div>
 </div>

</Modal.Body>
<Modal.Footer>
  <Button variant="primary" onClick={handleClose1}>
    Close
  </Button>
  <Button variant="success" onClick={handleUpdate} >Update</Button>
</Modal.Footer>
</Modal>

<ToastContainer autoClose={2000} theme='colored ' position='top-center'/>
    </>
  )
}

export default EditProjects