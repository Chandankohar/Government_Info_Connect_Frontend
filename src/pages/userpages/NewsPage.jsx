import Spinner from '@/components/ui/Spinner';
import NewsInfoCard from '@/components/usercomponent/NewsInfoCard';
import axiosInstance from '@/utils/axios';
import { useAuth } from '../../../hooks';
import React, { useEffect, useState } from 'react'


const NewsPage = () => {
   const [notification, setnotification] = useState([]);
   const [loading, setLoading] = useState(true);
  const {user}=useAuth()
  useEffect(() => {
       const getAppliedSchemes = async() => {
         try {
          if(user){
           const { data } = await axiosInstance.get('/news/usernews');
           setnotification([...data.news].reverse());
           setLoading(false);
           return
          }
          const { data } = await axiosInstance.get('/news');
          setnotification([...data.news].reverse());
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
       <h1 className='fw-bold fs-4 mt-3 mb-3 text-center'>Notification</h1>
       <div className="my-4 ms-10 me-10  border-[1px] border-secondary"></div>

       {notification.length>0?( <div className=" mt-4 ms-10 me-10 ">
        {
          notification.map((news,index) => <NewsInfoCard news={news}  key={index} />)}
          </div>):(<h1 className='text-center font-bold mt-5'>There is no news notification </h1>)}
    </div>
  )
}

export default NewsPage
