import { useEffect } from 'react'
import {  useScheme } from '../../../hooks'

import SchemeCard from '../ui/SchemeCard'
import Spinner from '../ui/Spinner'

const RecentScheme = () => {
 const allscheme= useScheme()
 const {scheme,loading,getScheme}=allscheme
 useEffect(()=>{
  getScheme()
},[])

 
 if (loading) {
  return <Spinner />;
}
  return (
    <>
      <div className='border rounded-4 ml-6 mr-6 shadow mt-5 ' style={{backdropFilter: 'blur(8px) saturate(5) '}} >
      <h1 className='fw-bold fs-4  mt-4 text-center '>Recent Scheme</h1>
      <div className="ms-10 me-10  border-[1px] border-secondary"></div>
     {scheme.length>0?( <div className="grid grid-cols-1 ms-10 me-10 justify-items-evenly  md:grid-cols-2 md:gap-0 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-10" >
      
        {
          scheme.slice(0,4).map((scheme) => <SchemeCard scheme={scheme} key={scheme._id} />)}
          </div>):(<h1 className='text-center font-bold mt-5'>There is no any scheme available</h1>)}
    </div>
    </>
  )
}

export default RecentScheme
