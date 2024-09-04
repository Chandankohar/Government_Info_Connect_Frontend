import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import SchemeApplyForm from './SchemeApplyForm';
import { IoMdArrowRoundBack } from "react-icons/io";

const SingleSchemeuPage = () => {
  
    const { id } = useParams();
  const [scheme, setscheme] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showform,setshowform]=useState(false)

  

  useEffect(() => {
    if (!id) {
      return '';
    }

    setLoading(true);

    const getScheme = async () => {
      const { data } = await axiosInstance.get(`/scheme/single-scheme/${id}`);
      setscheme(data.scheme);
      setLoading(false);
      
    };
    
    getScheme();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!scheme) {
    return;
  }
  const handleapplyclick=()=>{
    if (!showform){
    setshowform(true)}
    else{
      setshowform(false)
    }
  }
  const today = new Date();
  const d1 = new Date(scheme.validatedate);
  

  return (
    !showform?(<div>
      
<section className="py-5">
  <div className="container border rounded-4 p-10" style={{backdropFilter: 'blur(5px) saturate(5) '}}>
    <div className="row gx-5">
      <aside className="col-lg-4">
        <div className="border mt-10 rounded-4 mb-3 d-flex justify-content-center" >
          <a data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image" href={scheme.photos[0]}>
            <img style={{maxWidth:'100%',margin:'auto',maxHeight:'100%'}} className="rounded-4 fit" src={scheme.photos[0]} />
          </a>
        </div>
        
       
      </aside>
      <main className="col-lg-6">
        <div className="ps-lg-3">
          <h4 className="title text-warning font-bold text-2xl mb-2">
          {scheme.schemename}
          </h4>
          <div className="title text-warning font-bold  mb-1"> DETAILS</div>

          <p>
          {scheme.description}
          </p>

          <div className="row mt-3 mb-3">
            <dt className="col-5 text-warning">Scheme Type:</dt>
            <dd className="col-3">{scheme.schemetype.toUpperCase()}</dd>
        
            <dt className="col-5 text-warning">Municipality:</dt>
            <dd className="col-3">{scheme.municipality.toUpperCase()}</dd>
            <dt className="col-5 text-warning">Maximum Applicant:</dt>
            <dd className="col-3"> {scheme.maxapplicant}</dd>
            <dt className="col-5 text-warning">Benefit for:</dt>
            <dd className="col-3"> {scheme.beneficialgroup.toUpperCase()}</dd>

            <dt className="col-5 text-warning">Valide Date Upto:</dt>
            <dd className="col-3"> {scheme.validatedate.slice(0,10)}</dd>

            <dt className="col-5 text-warning">Document Required:</dt>
            <dd className="col-3"> {scheme.documentrequired.toUpperCase()}</dd>
          </div>

          <hr />


          {d1>=today?(<button className='btn btn-primary text-black  mt-2 ml-10' onClick={handleapplyclick} >Apply</button>):(<h1 className='text-danger font-bold'>This scheme has been expired or Valid date has been end!</h1>)}

         
        </div>
      </main>
    </div>
  </div>
</section>

    
    
    
         
         </div>):(<div > <button className='btn btn-primary ml-20 ' onClick={handleapplyclick}><IoMdArrowRoundBack /></button>
         <SchemeApplyForm scheme={scheme}/></div>)
    
  )
}

export default SingleSchemeuPage
