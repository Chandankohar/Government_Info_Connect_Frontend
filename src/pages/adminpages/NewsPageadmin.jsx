import NewsInfoCardadmin from '@/components/admincomponent/NewsInfoCardadmin';
import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const NewsPageadmin = () => {
   const [notification, setnotification] = useState([]);
   const [loading, setLoading] = useState(true);
   const [showdetail, setshowdetail] = useState(false);
  useEffect(() => {
       const getnews = async() => {
         try {
           const { data } = await axiosInstance.get('/news/adminnews');
           setnotification([...data.news].reverse());
           setLoading(false);
         } catch (error) {
           console.log(error);
         }
       };
       getnews();
    }, []);
    
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='text-center mt-3'>
      <Link  className="inline-flex  gap-1 rounded-full bg-secondary py-2 px-6 text-white" to='/admin/addnews'>Add Notification</Link>
      <h1 className='fw-bold fs-4  mb-3 text-center mt-3'>Notification</h1>
      <div className="my-4 ms-10 me-10  border-[1px] border-secondary"></div>


       {notification.length>0?( <div className="ms-20 me-20 mt-4">
        {
          notification.map((news,index) => <NewsInfoCardadmin news={news} setshowdetail={setshowdetail} showdetail={showdetail}  key={index} />)}
          </div>):(<h1 className='text-center font-bold mt-5'>There is no news notification </h1>)}
    </div>
  )
}

export default NewsPageadmin
