import React from 'react';
import { Outlet } from 'react-router-dom';
import background from '../../assets/d8vjlnS-light-background-images.jpg'
//import { Header } from '../ui/Header';
import Footer from '../ui/Footer';
import { AdminHeader } from './AdminHeader';
import { useAuthAdmin } from '../../../hooks';

const AdminLayout = () => {
  const {admin}=useAuthAdmin()
  return (
    
      
      
      <div className=" flex min-h-screen max-w-screen-full flex-col" style={{
          // backgroundColor:'darkkhaki',
        backgroundImage:`url(${background})` ,
   
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundBlendMode: 'luminosity',
      }}>
        <AdminHeader />
      <h1 style={{marginTop:'120px',textAlign:'center',fontSize:'35px',fontWeight:'bold',color:'black'}}>WELCOME TO GOVINFOCONNECT! </h1>
        <Outlet />
        {/* <AdminIndexPage/> */}
       {admin && <div><Footer /></div>}
      </div>
      
    
  );
};

export default AdminLayout;
