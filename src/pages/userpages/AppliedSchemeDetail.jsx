import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import MyDocument from './MyDocument';
import { toast } from 'react-toastify';

const AppliedSchemeDetail = () => {
    const { id } = useParams();
    const [applyscheme, setapplyscheme] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      if (!id) {
        return '';
      }
  
      setLoading(true);
  
      const getScheme = async() => {
        const { data } = await axiosInstance.get(`/appliedscheme/${id}`);
        setapplyscheme(data.singleappliedscheme);
        setLoading(false);
        
      };
      
      getScheme();
    }, [id]);
  
    const handeldelete=async()=>{
      const { data } = await axiosInstance.delete(`/appliedscheme/deleteuserscheme/${id}`);
      
      if (data.result){
          toast.success(data.message);
          setRedirect(true);
          return
        }
        toast.error("unauthorize or something went wrong");
        
       
     }


    if (loading) {
      return <Spinner />;
    }
    if (redirect) {
      return <Navigate to={'/account/userscheme'} />;
    }
  
    if (!applyscheme) {
      return;
    }

   

  return (
    <div className=" container flex  lg:pl-20 lg:pe-20 ">
    <div className='container  mt-3 border lg:ml-20 lg:me-20 p-5 align-item-center  mt-3 shadow rounded' style={{backdropFilter: 'blur(8px) saturate(5) '}}>
        <h1 className='fw-bold fs-4  mb-3 text-center'>Applied Scheme Detail</h1>
        <div className="my-4   border-[1px] border-secondary"></div>

      <div className="row  gap-1   sm:h-1/5 sm:flex-row sm:items-stretch lg:gap-28 lg:pl-32 lg:pr-20">
      <div className="col-5 text-warning fw-bold">Scheme Name:</div>
      <div className="col ">{applyscheme.schemename}</div>
       <div className="w-100 mt-2"></div>
       <div className="col-5 text-warning fw-bold">Scheme Type:</div>
      <div className="col">{applyscheme.schemetype.toUpperCase()}</div>
      <div className="w-100 mt-2"></div>
       <div className="col-5 text-warning fw-bold">Username:</div>
      <div className="col">{applyscheme.username.toUpperCase()}</div>
      <div className="w-100 mt-2"></div>
       <div className="col-5 text-warning fw-bold">User Citizenship Id:</div>
      <div className="col">{applyscheme.usercitizenid}</div>
      <div className="w-100 mt-2"></div>
       <div className="col-5 text-warning fw-bold">Address:</div>
      <div className="col">{applyscheme.address}</div>
      <div className="w-100 mt-2"></div>
       <div className="col-5 text-warning fw-bold">Phone no:</div>
      <div className="col">{applyscheme.phone}</div>
      <div className="w-100 mt-2"></div>
       <div className="col-5 text-warning fw-bold">Applied Date:</div>
      <div className="col">{applyscheme.date.slice(0,10)}</div>
      <div className="w-100 mt-2"></div>
       <div className="col-5 text-warning fw-bold">Status:</div>
     <div className="col "> <span className=" p-1 bg-secondary  bg-gradient  rounded border border-secondary">{applyscheme.status=='null'?'pending..':applyscheme.status}</span></div>
      <div className="w-100 mt-3"></div>
      <div className="col-5 text-warning fw-bold">Document Submitted:</div>
      <div className='grid grid-cols-1  justify-items-center  md:grid-cols-2 md:gap-1 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-5'>
     { applyscheme.document.map((photo,index)=>{ return(
      <a data-fslightbox="mygalley" key={index} className="m-4 flex flex-col md:m-2 xl:m-0 shadow rounded-2xl w-100 h-75" target="_blank" data-type="image" href={photo}>
      <img className='shadow rounded-2xl' style={{minWidth:'100%',margin:'auto',minHeight:'100%'}}  src={photo}/></a>)})
      }
</div>
<div className='h-1 w-full   bg-danger'></div>
      {applyscheme.status=='approved'?(<div><h1 className='text-warning'>Please download the pdf of your application and visit to your Municipality</h1>
        <PDFDownloadLink document={<MyDocument applyscheme={applyscheme} key={applyscheme._id} />} fileName='document.pdf'><button className=" bg-info bg-gradient rounded border text-black border-secondary p-0.5 " >Download Pdf</button></PDFDownloadLink></div>):(applyscheme.status=='rejected'?(<div className="col-10 text-danger">{applyscheme.rejectreason}</div>):(<div className='text-warning'>Please wait for the response its pending!!!</div>))}
      {applyscheme.status=='null'?(<div  ><button className='mt-10 bg-info bg-gradient rounded border text-black border-danger pl-3 pe-3' onClick={handeldelete}>Delete</button></div>):''}
  </div>
</div>
</div>   
  )
}

export default AppliedSchemeDetail
