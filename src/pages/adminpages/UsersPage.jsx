import React, { useState, useEffect } from 'react';

import axiosInstance from '@/utils/axios';

import Spinner from '@/components/ui/Spinner';

import UserInfoCard from '@/components/admincomponent/UserInfoCard';

const UsersPage = () => {
  
  const [user, setuser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading,setsearchLoading]=useState(false)

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  
    const getUsers = async () => {
      try {
       
        const { data } = await axiosInstance.get('admin/alluser');
        setuser(data.alluser);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
  useEffect(() => {
    
    getUsers();
  }, []);

const handelOnClickSearch=(e)=>{
  clearTimeout(searchTimeout);
  setSearchText(e.target.value);
  
  if (searchText.trimStart() !== '') {
    setsearchLoading(true)
    setSearchTimeout(
      setTimeout(async () => {
        const { data } = await axiosInstance.get(
          `/admin/getuser/search/${searchText.trimStart()}`,
        );
        setuser(data);
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
      <input className='w-25 me-3' type="text" placeholder='search user by citizenship id ' value={searchText} onChange={(e) => handelOnClickSearch(e)} />
        <button
          className="inline-flex gap-1 rounded-full bg-primary py-2 px-6 text-white"
          onClick={handelOnClickSearch}
        >
         
          Search user
        </button>
        <h1 className='fw-bold fs-4 mt-5 text-center'>All Users</h1>
        <div className="my-4 ms-10 me-10  border-[1px] border-secondary"></div>

      </div>
     {searchLoading?(<Spinner/>):(<div>
        {user.length > 0?(<div className="ms-20 me-20  mt-4">
          {user.map((users) => <UserInfoCard users={users} key={users._id} />)}</div>):(<h1>user not available</h1>)
      }
      </div>)}
      </div>
  );
};

export default UsersPage;
