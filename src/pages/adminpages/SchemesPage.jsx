import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '@/utils/axios';
import Spinner from '@/components/ui/Spinner';
import SchemeInfoCard from '@/components/admincomponent/SchemeInfoCard';

const SchemesPage = () => {
  
  const [scheme, setscheme] = useState([]);
  const [loading, setLoading] = useState(true);
  // const allscheme = useScheme();
  // const { scheme, setscheme,loading,setLoading } = allscheme;
  const [searchLoading,setsearchLoading]=useState(false)
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  
  useEffect(() => {
 
    const getSchemes = async () => {
      
      try {
        const { data } = await axiosInstance.get('scheme/adminscheme');
        setscheme([...data.scheme].reverse());
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
    
    if (searchText.trimStart() !== '') {
      setsearchLoading(true)
      setSearchTimeout(
        setTimeout(async () => {
          const { data } = await axiosInstance.get(
            `/scheme/adminsearch/${searchText.trimStart()}`,
          );
          setscheme(data);
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
      {/* <AccountNav /> */}
      <div className="text-right ">
      <input className='w-25 me-3' type="text" placeholder='search scheme by name  ' onChange={(e) => handelOnClickSearch(e)}
            value={searchText}/>
        <button
          className="inline-flex gap-1 rounded-full bg-primary py-2 px-6 text-white"
          onClick={handelOnClickSearch}
        >
         
          Search Scheme
        </button>
        </div>
      <div className="text-center ">
      
        <Link
          className="inline-flex gap-1 rounded-full bg-primary py-2 px-6 text-white"
          to={'addscheme'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new scheme
        </Link>
       
      </div>
      <h1 className='fw-bold fs-4 mt-5 text-center'>All Schemes</h1>
      <div className="my-4 ms-10 me-10  border-[1px] border-secondary"></div>
     {searchLoading?(<Spinner/>):(<div >
      
     {scheme.length>0?( <div className="ms-20 me-20 mt-2">
      
         { scheme.map((scheme) => <SchemeInfoCard scheme={scheme} key={scheme._id} />)}
          </div>):(<h1 className='text-center font-bold mt-5'>There is no any scheme available</h1>)
        }
      </div>)}
    </div>

      )}

export default SchemesPage;
