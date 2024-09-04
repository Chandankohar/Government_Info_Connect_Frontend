import AppliedSchemeUserInfoCard from '@/components/admincomponent/AppliedSchemeUserInfoCard';
import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const SchemeAppliedUsers = () => {
    const {id}=useParams()
    const[appliedusers,setappliedusers]=useState([])
    const[loading,setLoading]=useState(true)
    const [searchLoading,setsearchLoading]=useState(false)
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
    useEffect(() => {
      const getSchemes = async () => {
       
        try {
          const { data } = await axiosInstance.get(`appliedscheme/allusersapplyscheme/${id}`);
          setappliedusers([...data.applieduser]);
          setLoading(false);
         
        } catch (error) {
          console.log(error);
        }
      };
      getSchemes();
     
  }, []);
  
  

    const handelOnClickSearch=(e)=>{
      
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);
      
      if (searchText.trimStart() !== '' ) {
        setsearchLoading(true)
        setSearchTimeout(
          setTimeout(async () => {
           
            const { data } = await axiosInstance.get(
              `/appliedscheme/searchuser/${id}/${searchText.trimStart()}`
             
            );
            setappliedusers(data);
            setsearchLoading(false)
          }, 500),
        );
      }
    }
  
    if (loading) {
      return <Spinner />;
    }
  
  return (
    <div>
       <div className="text-center ">
      <input className='w-25 me-3' type="text" placeholder='search user by citizenship id '  value={searchText} onChange={(e) => handelOnClickSearch(e)}  />
        <button
          className="inline-flex gap-1 rounded-full bg-primary py-2 px-6 text-white"
          onClick={handelOnClickSearch}
        >
         
          Search user
        </button>
        <h1 className='fw-bold fs-4 mt-5 text-center'>Applied Users For {appliedusers.length>0 && appliedusers[0].schemename}  Scheme</h1>
        <div className="my-4 ms-10 me-10  border-[1px] border-secondary"></div>

      </div>
      {searchLoading?(<Spinner/>):(appliedusers.length>0?( <div className="ms-20 me-20  mt-4">
        {
          appliedusers.map((applieduser) => <AppliedSchemeUserInfoCard applieduser={applieduser} key={applieduser._id} />)}</div>)
         :(<h1 className='text-center font-bold mt-5'>There is no any user available who apply for this scheme</h1>)
         )}
   
    </div>
  )
}

export default SchemeAppliedUsers
