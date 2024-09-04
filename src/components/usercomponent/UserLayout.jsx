import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../ui/Footer';
import { UserHeader } from './UserHeader';
import background from '../../assets/fncdlw7l.png'
import { useAuth } from '../../../hooks';

const UserLayout = () => {
  const {user}=useAuth()
  return (
    

      <div className=" flex min-h-screen text-white max-w-screen-full  flex-col"
       style={{
    //     backgroundImage:`url(${background})` ,
       backgroundImage:`url(https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/129325364/original/afaddcb9d7dfaaf5bff7ef04101935814665ac16/design-an-attractive-background-for-your-website.png)`,
    backgroundSize: "100%",
    backgroundBlendMode: 'overlay',
      }}
    >
        <div className='d-flex justify-content-center '>
      <UserHeader />
      </div>
      <h1 style={{marginTop:'110px',textAlign:'center',fontSize:'35px',fontWeight:'bold',color:'#7df1e2'}}>WELCOME TO GOVINFOCONNECT!</h1>
      <h3 style={{marginTop:'10px',textAlign:'center',fontSize:'15px',fontWeight:'bold',color:'#c4f702'}}>TAKE MAXIMUM ADVANTAGE OF SCHEME</h3>
        
        <Outlet />
       {user && <div><Footer /></div>}
      </div>
      
    
  );
};

export default UserLayout;
