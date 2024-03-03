import axios from "axios"


export const commonApi =async(httpRequest,url,reqBody,reqHeader)=>{
    const reqConfiq ={
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}//since we have two type of contents to upload
    }
   return   await axios(reqConfiq).then((result)=>{
    return result
    }).catch((err)=>{
        return err
    })
}