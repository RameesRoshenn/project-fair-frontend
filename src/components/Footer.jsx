import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div style={{width:'100%' , height:'300px' }} className='d-flex justify-content-center align-w-100 flex-column  bg-success '>
        <div className="footer d-flex align-items-center justify-content-evenly w-100 ">
            <div className="websites" style={{width:'400px'}}>
                <h3 className='text-light'><i class="fa-brands fa-stack-overflow me-3 "></i>{''}Project Fair</h3>
                <p  >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda modi corporis, dolores tenetur vel labore nostrum in, molestiae, corrupti magnam voluptate deserunt? Saepe iure.</p>
               
            </div> 
             <div className='products d-flex flex-column'>
                <h3  className='text-light'>PRODUCTS</h3>
                <Link to={''} style={{textDecoration:'none',color:'black'}}>Home</Link>
                <Link to={'/login'} style={{textDecoration:'none',color:'black'}}>Login</Link>
                <Link to={'/register'} style={{textDecoration:'none',color:'black'}}>Register</Link>
                
             </div>
             <div className='links d-flex flex-column'>
                <h3  className='text-light'>USEFUL LINKS</h3>
                <Link to={''} style={{textDecoration:'none',color:'black'}}>Pricing</Link>
                <Link to={''} style={{textDecoration:'none',color:'black'}}>Settings</Link>
                <Link to={''} style={{textDecoration:'none',color:'black'}}>Orders</Link>
                <Link to={''} style={{textDecoration:'none',color:'black'}}>Help</Link>
             </div>
             <div className="contacts ">
      <h4 className='mb-3 text-light '>contacts us</h4>
      <div className= 'd-flex mb-3'>
        <input type="text" className='form-control' placeholder='enter your email id'/>
        <button className='btn btn-warning ms-2'>Subscribe</button>
      </div>

      <div className='d-flex justify-content-evenly align-items-center'>
      <Link to={'https://bootswatch.com'}style={{textDecoration:'none',color:'black'}}><i
      class="fa-brands fa-instagram fa-2x"></i></Link>

      <Link to={'https://bootswatch.com'}style={{textDecoration:'none',color:'black'}}><i
      class="fa-brands fa-twitter fa-2x"></i></Link>

      <Link to={'https://bootswatch.com'}style={{textDecoration:'none',color:'black'}}><i
      class="fa-brands fa-linkedin fa-2x"></i></Link>

      <Link to={'https://bootswatch.com'}style={{textDecoration:'none',color:'black'}}><i
      class="fa-brands fa-facebook fa-2x"></i></Link>








     


      </div>
     </div>

            
            </div>
            <p className=' mt-5  text-align-center justify-content-center d-flex'>Copyright © 2023 Project fair . Built with React. </p>
          
             </div>
             
  )
}

export default Footer