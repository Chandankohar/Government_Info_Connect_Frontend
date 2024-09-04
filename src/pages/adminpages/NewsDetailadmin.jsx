import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
 import { Link } from 'react-router-dom';


const NewsDetailadmin = () => {
  const { id } = useParams();
  const [news, setnews] = useState(null);
  const [desc, setdesc] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return '';
    }

    setLoading(true);

    const getNews = async () => {
      const { data } = await axiosInstance.get(`/news/single-news/${id}`);
     
      setdesc(data.news.newsdescription.split('/n'))
      setnews(data.news);
      setLoading(false);
      
    };
    
    getNews();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!news) {
    return;
  }

 const handeldelete=async()=>{
  const { data } = await axiosInstance.delete(`/news/delete-news/${id}`);
  if (data.result){
      toast.success('Notification Deleted succesfully');
      setRedirect(true);
    } else {
      toast.error('Unable to delete the Notification');
    }
   
 }
 if (redirect) {
  return <Navigate to={'/admin/news'} />;
}

  return (
    <div className='container w-50 mt-3 border p-5  mt-3 shadow rounded' style={{backdropFilter: 'blur(5px) saturate(3) '}}>
    <h1 className='fw-bold fs-4 mt-3 mb-3 text-center'>News Detail</h1>
    <h4 className="title text-black font-bold text-2xl mb-2 text-center">
          {news.newstitle.toUpperCase()}
          </h4>
  {desc.map((detail,index)=><div className="row fw-bold text-black flex justify-content-center" key={index}>{detail}</div>)}
  <div className='h-1 w-full  bg-secondary mt-3 mb-3'></div>
       
        <Link to={`/admin/update-news/${news._id}`} className="col bg-gray-600 ms-10  hover:bg-blue-600 ps-3 pe-3 rounded-xl text-white" variant="secondary">  
                Update or Edit the news 
         </Link>
         <button onClick={handeldelete} className="col bg-gray-600 hover:bg-blue-600 ms-10 ps-3 pe-3 rounded-xl text-white" variant="secondary">  
                Delete the news 
         </button>

    </div>
 
  );
};

export default NewsDetailadmin;
