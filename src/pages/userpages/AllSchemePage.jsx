import {   useScheme } from '../../../hooks';
import React, { useEffect } from 'react'
import Spinner from '@/components/ui/Spinner';
import SchemeInfoCard from '@/components/usercomponent/SchemeInfoCard';
const AllSchemePage = () => {
  const allscheme = useScheme();
  const { scheme, loading,getScheme } = allscheme;
  useEffect(()=>{
    getScheme()
},[])
  if (loading) {
    return <Spinner />;
  }
  return (
    
       <div>
         <h1 className='fw-bold fs-4 mt-5 text-center'>All Scheme</h1>
         <div className="my-4 ms-10 me-10  border-[1px] border-secondary"></div>
     {scheme.length>0?( <div className=" mt-4 ms-20 me-20">
        {
          scheme.map((scheme) => <SchemeInfoCard scheme={scheme} key={scheme._id} />)}
          </div>):(<h1 className='text-center font-bold mt-5'>There is no any scheme available</h1>)}
    </div>
   
  )
}

export default AllSchemePage
