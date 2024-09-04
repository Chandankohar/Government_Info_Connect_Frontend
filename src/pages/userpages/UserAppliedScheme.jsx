import Spinner from '@/components/ui/Spinner';
import UserAccountNav from '@/components/usercomponent/UserAccountNav';
import UserAppliedInfoCard from '@/components/usercomponent/UserAppliedInfoCard';
import axiosInstance from '@/utils/axios';
import React, { useEffect, useState } from 'react'

const UserAppliedScheme = () => {
   const [applyscheme, setapplyscheme] = useState([]);
   const [loading, setLoading] = useState(true);
  useEffect(() => {
       const getAppliedSchemes = async() => {
         try {
           const { data } = await axiosInstance.get('/appliedscheme/');
           setapplyscheme([...data.appliedscheme].reverse());
           setLoading(false);
         } catch (error) {
           console.log(error);
         }
       };
       getAppliedSchemes();
    }, []);
    
  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <UserAccountNav />
       {applyscheme.length>0?( <div className="mx-4 mt-4">
        {
          applyscheme.map((appliedscheme) => <UserAppliedInfoCard appliedscheme={appliedscheme} key={appliedscheme._id} />)}
          </div>):(<h1 className='text-center font-bold mt-5'>You donot apply on any scheme </h1>)}
    </div>
  )
}

export default UserAppliedScheme
