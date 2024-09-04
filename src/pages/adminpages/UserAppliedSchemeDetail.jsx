import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserAppliedSchemeDetail = () => {
    const { id } = useParams();
    const [redirect, setredirect] = useState(false);
    const [rejectdesc, setrejectdesc] = useState(false);
    const [applyscheme, setapplyscheme] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reject, setreject] = useState({status:'rejected',rejectreason:'',});
    
    useEffect(() => {
      if (!id) {
        return '';
      }
  
      setLoading(true);
  
      const getScheme = async () => {
        const { data } = await axiosInstance.get(`/appliedscheme/${id}`);
        setapplyscheme(data.singleappliedscheme);
        setLoading(false);
        
      };
      
      getScheme();
    }, [id]);
  
    if (loading) {
      return <Spinner />;
    }
  
    if (!applyscheme) {
      return;
    }
const handelShowRejectDesc=()=>{
  setrejectdesc(true)
}
const handelrejectchange=(e)=>{
  const { name, value } = e.target;
  setreject({ ...reject, [name]: value });
}
const isValidReason = () => {
  if (reject.rejectreason.trim() === '') {
    toast.error("Please write valid reason to reject!");
    return false;
  }
  return true;
}
//for rreject
const handelSubmitReject=async()=>{ 
  setrejectdesc(false)
if(isValidReason){
  const { data } = await axiosInstance.post(
    `/appliedscheme/applyschemestatus/${applyscheme._id}`,
    reject,
  );

if(data.success){
  toast.success('Applied Scheme Rejected succesfully');
  setredirect(true)
}
else{
  toast.error('Something went wrong');
}

}
}
//for approved
const handelSubmitApproved=async()=>{ 
  setrejectdesc(false)
  const approve= {status:'approved',rejectreason:'null',};
  const { data } = await axiosInstance.post(
    `/appliedscheme/applyschemestatus/${applyscheme._id}`,
    approve,
  );
console.log(data)
if(data.success){
  toast.success('Applied Scheme Approved succesfully');
  setredirect(true)
}
else{
  toast.error('Something went wrong');
}

}

if(redirect){
return <Navigate to={`/admin/appliedschemeusers/${applyscheme.scheme._id}`} />}

  return (
    <div className=" container flex  lg:pl-20 lg:pe-20 ">
    <div className='container  mt-3 border lg:ml-20 lg:me-20 p-5 align-item-center  mt-3 shadow rounded' style={{backdropFilter: 'blur(8px) saturate(5) '}}>
        <h1 className='fw-bold fs-4 mt-3 mb-3 text-center'>Applied Scheme Detail</h1>
        <div className="my-4   border-[1px] border-secondary"></div>

      <div className="row  gap-1 sm:h-1/5 sm:flex-row sm:items-stretch lg:gap-28 lg:pl-32 lg:pr-20">
      <div className="col-5 fw-bold">Scheme Name:</div>
      <div className="col ">{applyscheme.schemename.toUpperCase()}</div>
       <div className="w-100 mt-2"></div>
       <div className="col-5 fw-bold">Scheme Type:</div>
      <div className="col">{applyscheme.schemetype.toUpperCase()}</div>
      <div className="w-100 mt-2"></div>
       <div className="col-5 fw-bold">Username:</div>
      <div className="col">{applyscheme.username.toUpperCase()}</div>
      <div className="w-100 mt-2"></div>
       <div className="col-5 fw-bold">User Citizenship Id:</div>
      <div className="col">{applyscheme.usercitizenid}</div>
      <div className="w-100 mt-2"></div>
       <div className="col-5 fw-bold">Address:</div>
      <div className="col">{applyscheme.address}</div>
      <div className="w-100 mt-2"></div>
       <div className="col-5 fw-bold">Phone no:</div>
      <div className="col">{applyscheme.phone}</div>
      <div className="w-100 mt-2"></div>
       <div className="col-5 fw-bold">Applied Date:</div>
      <div className="col">{applyscheme.date.slice(0,10)}</div>
      <div className="w-100 mt-2"></div>
       <div className="col-5 fw-bold">Status:</div>
       <div className="col "> <span className=" p-1 bg-secondary  bg-gradient  rounded border border-secondary">{applyscheme.status=='null'?'pending..':applyscheme.status}</span></div>
       <div className="w-100 mt-3"></div>
       
      <div className="col-5 fw-bold">Document Submitted:</div>
      <hr />
      <div className='grid grid-cols-1  justify-items-center  md:grid-cols-2 md:gap-1 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-5'>
     { applyscheme.document.map((photo,index)=>{ return(
      <a data-fslightbox="mygalley" className="m-5 flex flex-col md:m-2 xl:m-0 shadow rounded-2xl w-100 h-75" target="_blank" data-type="image" href={photo} key={index}>
      <img className='rounded-2xl'  style={{minWidth:'100%',margin:'auto',minHeight:'100%'}}  src={photo} key={index}/></a>)})
      }
</div>
<div className='h-1 w-full  bg-danger'></div>
      {applyscheme.status=='null'?(<div className=' row mt-3' ><button type='button' className="col-3 bg-success me-5 bg-gradient  rounded border border-secondary" onClick={handelSubmitApproved} >Approved</button>
{!rejectdesc?(<button  className="col-3 bg-danger bg-gradient  rounded border border-secondary" onClick={handelShowRejectDesc}>Reject</button>):(<><button  className="col-3 bg-danger bg-gradient  rounded border border-secondary" onClick={handelSubmitReject}>Submit</button>
<input className='col-3' type='text' placeholder='Please enter the reason of rejection' name='rejectreason' value={reject.rejectreason} onChange={handelrejectchange}/></>)}</div>):'Already response should be sent'}
      
  </div>
</div>  
</div> 
  )
}

export default UserAppliedSchemeDetail
