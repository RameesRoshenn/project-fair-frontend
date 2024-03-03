import { BASE_URL } from "./baseurl"
import { commonApi } from "./commonApi"





//regisster api
export const registerApi = async(user)=>{
   return await commonApi("POST",`${BASE_URL}/user/register`,user,"")
}

//login api

export const loginAPI = async(user)=>{
   return await commonApi("POST",`${BASE_URL}/user/login`,user,"")
}

//add project

export const addProjectApi = async(reqBody,reqHeader)=>{
   return await commonApi("POST",`${BASE_URL}/project/add`,reqBody,reqHeader)
}



//home project

export const homeProjectApi = async()=>{
   return await commonApi("GET",`${BASE_URL}/project/home-project`,"","")
}

//all project
export const allProjectApi = async(searchKey,reqHeader)=>{
   //query parameter = path?key=value
   return await commonApi("GET",`${BASE_URL}/project/all-project?search=${searchKey}`,"",reqHeader)
}

//user projects
export const userProjectApi = async(reqHeader)=>{
   return await commonApi("GET",`${BASE_URL}/project/user-project`,"",reqHeader)
}

//edit projects
export const editProjectApi = async(projectId,reqBody,reqHeader)=>{

   //path  parameter - :id -router
   return await commonApi("PUT",`${BASE_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}

//deleteProjectApi


export const deleteProjectApi = async(projectId,reqHeader)=>{

   //path  parameter - :id -router
   return await commonApi("DELETE",`${BASE_URL}/project/remove/${projectId}`,{},reqHeader)
}

//edit profile
export const editProfileApi = async(reqBody,reqHeader)=>{

   //path  parameter - :id -router
   return await commonApi("PUT",`${BASE_URL}/user/edit`,reqBody,reqHeader)
}



