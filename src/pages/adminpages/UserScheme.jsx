import UserschemeInfoCard from '@/components/admincomponent/UserschemeInfoCard';
import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const UserScheme = () => {
    const {id}=useParams()
  const [applyscheme, setapplyscheme] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
 
    const getSchemes = async () => {
      
      try {
        const { data } = await axiosInstance.get(`appliedscheme/userscheme/${id}`);
        setapplyscheme([...data.appliedscheme].reverse());
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getSchemes();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1 className='fw-bold fs-4 mt-5 text-center'>User Scheme</h1>
      <div className="my-4 ms-10 me-10  border-[1px] border-secondary"></div>

       {applyscheme.length>0?( <div className="ms-20 me-20 mt-4">
        {
          applyscheme.map((appliedscheme) => <UserschemeInfoCard appliedscheme={appliedscheme} key={appliedscheme._id} />)}
          </div>):(<h1 className='text-center font-bold mt-5'>This user donot apply on any scheme </h1>)}
    </div>
  )
}

export default UserScheme
