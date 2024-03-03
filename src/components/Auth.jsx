import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { loginAPI, registerApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { isAuthTokenContext } from '../Contexts/ContextShare';

function Auth({ register }) {

  const {isAuthToken,setIsAuthToken}=useContext(isAuthTokenContext)
  //to hold the value from input box
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })

  console.log(userData);


  //navigate
  const navigate = useNavigate()

  const registerform = register ? true : false

  //register function
  const handleRegister = async (e) => {
    e.preventDefault()

    const { username, email, password } = userData

    if (!username || !email || !password) {
      toast.info('please fill  the form completely')
    }
    else {
      const result = await registerApi(userData)
      // console.log(result.data);
      if (result.status === 200) {
        toast.success(`${result.data.username} is successfully registerd`)
        setUserData({
          username: "",
          email: "",
          password: ""
        })
        //move to login page
        navigate('/login')
      }
      else {
        toast.error(result.response.data)
      }
    }
  }

  //login register

  const handleLogin = async (e) => {
    e.preventDefault()

    //destructure
    const { email, password } = userData
    if (!email || !password) {
      toast.info('please fill  the form completely')
    }
    else {
      const result = await loginAPI(userData)
      console.log(result);
      // console.log(result.data.existingUser);

      if(result.status === 200){
        toast.success('Login Successfully')
        
        
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)

        setIsAuthToken(true)
        setUserData({
          // username: "",
          email: "",
          password: ""
        })
        
        //navigate to home
        setTimeout(()=>{
        navigate('/')
      },2000)
      }
      
      else{
        toast.error(result.response.data)
      }
    }
  }

  return (
    <>

      <div style={{ width: '100%', height: '100vh' }} className='d-flex  justify-content-center  align-items-center '>
        <div className='w-75 container '>
          <Link style={{ textDecoration: 'none', color: 'blue' }} to={'/'} ><i class="fa-solid fa-arrow-right fa-rotate-100 me-2"></i>Back to Home</Link>
          <div className='card bg-success  p-5 rounded '>
            <div className='row align-items-center '>
              <div className='col-lg-6'>
                <img src="http://www.tropiqana.com/fundsmanager/app-assets/img/gallery/login.png" alt="no image" width={'100%'} />
              </div>
              <div className=' col-lg-6 '>
                <div className='d-flex align-items-center  flex-column '>
                  <h1 className='text-center text-light '>  <i class="fa-brands fa-stack-overflow fa-2x "></i>
                    Project Fair</h1>
                  <h5>
                    {
                      registerform ? "Sign up to your Account" : "Sign in to your Account"
                    }
                  </h5>

                  <Form className='mt-5 w-100 '>
                    {
                      registerform &&
                      <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Control type="text" placeholder="Username" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />

                      </Form.Group>
                    }
                    <Form.Group className="mb-3" controlId="formBasicEmail">

                      <Form.Control type="text" placeholder="Email Address" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">

                      <Form.Control type="text" placeholder="Password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />

                    </Form.Group>
                    {
                      registerform ?
                        <div>
                          <button onClick={handleRegister} className='btn btn-warning  round mt-3 '> Register</button>
                          <p>Already a User? Click here to <Link to={'/login'} style={{ color: 'blue' }}>Login</Link></p>
                        </div> :
                        <div>
                          <button onClick={handleLogin} className='btn btn-warning  round mt-3 '> Login</button>
                          <p>New User? Click here to <Link to={'/register'} style={{ color: 'blue' }}>Register</Link></p>
                        </div>
                    }

                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <ToastContainer autoClose={2000} theme='colored' position='top-center' />
    </>

  )
}

export default Auth