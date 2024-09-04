import { useAuth} from '../../../hooks';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';
import SchemeCard from '@/components/ui/SchemeCard';

const SpecificSchemePage = () => {
    const { type } = useParams();
    const {user}=useAuth()
    const municipality=user.municipality
    const [scheme, setscheme] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!type) {
            return '';
          }
          setLoading(true);
      const getSchemes = async () => {
        
        try {
          const { data } = await axiosInstance.get(`/scheme/${type}`,{
            params: {
             municipality,
            }
          });
          setscheme(data.scheme);
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
      <h1 className='fw-bold fs-4 mt-5 text-center'>{type.toUpperCase()} SCHEME</h1>
      <div className="my-4 ms-10 me-10  border-[1px] border-secondary"></div>
       {scheme.length>0?( <div className="grid grid-cols-1  justify-items-center ms-10 me-20  md:grid-cols-2 md:gap-0 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-10">
        {
          scheme.map((scheme) => <SchemeCard scheme={scheme} key={scheme._id} />)}
          </div>):(<h1 className='text-center font-bold mt-5'>There is no any {type} scheme available</h1>)}
    </div>
  )
}

export default SpecificSchemePage
