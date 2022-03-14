import React from 'react';
import './Homepage.css'
// import indigo from './indigo.jpg'



const Homepage = (user) => {
    return (
        <div className='img' >
            <div className='btnn'>
                <a href="/register" className="btnn">
                    Register Now <i class="fa fa-chevron-right"></i>
                </a>
                
            </div>
        </div>
    );
}


export default Homepage;

// style={{ backgroundImage: `url(${indigo})` }}
// backgroundImage: `url("https://cdn.sanity.io/images/2od8agy3/production/4b96b51363ed33dc08a88ee453ecb39339cfd7a7-1920x1023.webp")`,
            // backgroundSize: "cover",
            // height: "100vh",
            // color: "#f5f5f5",