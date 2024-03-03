import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from '../services/baseurl';
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { editProfileApi } from '../services/allApi';


function Profile() {
    const [open, setOpen] = useState(false);

    const [userProfile, setUserProfile] = useState({
        username: "",
        email: "",
        password: "",
        github: "",
        linkedin: "",
        profile: ""
    })

    const [isUpdate,setIsUpdate] =useState(false)

    //once an image is uploaded then that image will be stored in existing image

    const [existingImage, setExistingImage] = useState("")

    //to hold url of the image
    const [preview, setPreview] = useState("")


    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setUserProfile({ ...userProfile, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin, profile: "" })

        setExistingImage(user.profile)
    }, [isUpdate])

    useEffect(() => {
       if(userProfile.profile) {
            setPreview(URL.createObjectURL(userProfile.profile))
        }
        else{
            setPreview("")
        }
    }, [userProfile.profile])

    const handleProfileUpdate =async()=>{
        const {username,email,password,github,linkedin,profile} =userProfile
        if(!github || !linkedin ){

            toast.info('please fill the form completely')

        }
        else{
            const reqBody =new FormData()
            reqBody.append("username",username)
            reqBody.append("email",email)
            reqBody.append("password",password)
            reqBody.append("github",github)
            reqBody.append("linkedin",linkedin)
            preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)

        
        const token =sessionStorage.getItem("token")
        
        if(preview){
            const reqHeader ={
              "Content-Type":"multipart/form-data",
              "Authorization":`Bearer ${token}`
        
            }
            const result =await editProfileApi(reqBody,reqHeader)
            console.log(result);
            if(result.status ===200){
                toast.success('profile updated successfully')
                sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                setIsUpdate(true)
            }
            else{
                console.log(result.response.data);
            }
        }
            else{
                const reqHeader ={
                  "Content-Type":"multipart/form-data",
                  "Authorization":`Bearer ${token}`
            
                }
                const result =await editProfileApi(reqBody,reqHeader)
                console.log(result);
                if(result.status ===200){
                    toast.success('profile updated successfully')
                    sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                    setIsUpdate(true)
                }
                else{
                    console.log(result.response.data);
                }
            }
            }
        
    }


    return (
        <div className=' card shadow p-5 mb-5'>
            <div className=' d-flex  justify-content-between '>
                <h1>Profile</h1>
                <button onClick={() => setOpen(!open)} className='btn btn-outline-info'><i class="fa-solid fa-angle-down"></i></button>
            </div>
            <Collapse in={open}>
                <div className='  justify-content-center mt-4 text-center row '>
                    <label htmlFor="profile" className='mb-5'>
                        <input id='profile' type="file" style={{ display: 'none' }} onChange={(e) => setUserProfile({ ...userProfile, profile:e.target.files[0] })} />
                       {existingImage==""?
                        <img style={{ width: '200px', height: '200px' }} className=' rounded-circle ' src={preview?preview:"http://www.freeiconspng.com/uploads/female-user-icon-clip-art--30.png"} alt="" />: <img style={{ width: '200px', height: '200px' }} className=' rounded-circle ' src={preview?preview:`${BASE_URL}/uploads/${existingImage}`} alt="" />}
                    </label>
                    <div className='mb-3'>
                        <input type="text" className=' form-control ' placeholder="Github" value={userProfile.github} onChange={(e) => setUserProfile({ ...userProfile, github: e.target.value })} />
                    </div>
                    <div className='mb-3'>
                        <input type="text" className=' form-control ' placeholder="LinkedIn" value={userProfile.linkedin} onChange={(e) => setUserProfile({ ...userProfile, linkedin: e.target.value })} />
                    </div>
                    <div className='mb-3 mt-3'>
                        <button onClick={handleProfileUpdate} className='btn btn-success  rounded w-100'>Update</button>
                    </div>

                </div>
            </Collapse>
            
<ToastContainer autoClose={2000} theme='colored ' position='top-center'/>
        </div>
    )
}

export default Profile