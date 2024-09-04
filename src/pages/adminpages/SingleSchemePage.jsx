import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SingleSchemePage = () => {
 
    const { id } = useParams();
  const [scheme, setscheme] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
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

 const handeldelete=async()=>{
  const { data } = await axiosInstance.delete(`/scheme/delete-scheme/${id}`);
  if (data.result){
      toast.success('Scheme Deleted succesfully');
      setRedirect(true);
    } else {
      toast.error('Unable to delete the Scheme');
    }
   
 }
 if (redirect) {
  return <Navigate to={'/admin'} />;
}

  return (
    <div className='container mt-3 border p-5  mt-3 shadow rounded' style={{backdropFilter: 'blur(5px) saturate(3) '}}>
      <section className="py-5">
  <div className="container">
    <div className="row gx-5">
      <aside className="col-lg-5">
        <div className="border rounded-4 mb-3 d-flex justify-content-center" style={{backdropFilter: 'blur(5px) saturate(2) '}}>
          <a data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image" href={scheme.photos[0]}>
            <img style={{maxWidth:'100%',margin:'auto',maxHeight:'100%'}} className="rounded-4 fit" src={scheme.photos[0]} />
          </a>
        </div>
        
       
      </aside>
      <main className="col-lg-6">
        <div className="ps-lg-3">
          <h4 className="title text-black font-bold text-2xl mb-2">
          {scheme.schemename}
          </h4>
          <div className="title text-black font-bold  mb-1"> Details</div>

          <p>
          {scheme.description}
          </p>

          <div className="row mt-3 mb-3 ">
            <dt className="col-5">Scheme Type:</dt>
            <dd className="col-3">{scheme.schemetype.toUpperCase()}</dd>
        
            <dt className="col-5">Municipality:</dt>
            <dd className="col-3">{scheme.municipality.toUpperCase()}</dd>
            <dt className="col-5">Maximum Applicant:</dt>
            <dd className="col-3"> {scheme.maxapplicant}</dd>

            <dt className="col-5">Valide Date Upto:</dt>
            <dd className="col-3"> {scheme.validatedate.slice(0,10)}</dd>

            <dt className="col-5">Document Required:</dt>
            <dd className="col-3 mb-3"> {scheme.documentrequired.toUpperCase()}</dd>
            <hr />
          </div>

          


          <Link to={`/admin/update-scheme/${scheme._id}`} className="col bg-gray-600 ms-10  hover:bg-blue-600 ps-3 pe-3 rounded-xl text-white" variant="secondary">  
                Update the scheme 
         </Link>
         <button onClick={handeldelete} className="col mt-2 bg-gray-600 hover:bg-blue-600 ms-10 ps-3 pe-3 rounded-xl text-white" variant="secondary">  
                Delete the scheme 
         </button>
         <div className=' col  mt-2    me-auto '>
         <Link to={`/admin/appliedschemeusers/${scheme._id}`} className=" bg-gray-600 ms-10 hover:bg-blue-600 ps-3 pe-3 rounded-xl text-white" variant="secondary">  
                Applied User
         </Link> 
         </div>
         
        </div>
      </main>
    </div>
  </div>
</section>
   
   
         </div>
    
  )
}

export default SingleSchemePage
