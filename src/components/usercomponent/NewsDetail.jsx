import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';
import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';


const NewsDetail = () => {
  const { id } = useParams();
  const [news, setnews] = useState(null);
  const [desc, setdesc] = useState([]);
  const [loading, setLoading] = useState(false);
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

 
 

  return (
    <div className='container w-50 mt-3 border p-5  mt-3 shadow rounded' style={{backdropFilter: 'blur(5px) saturate(5) '}}>
    <h1 className='fw-bold fs-4 mt-3 mb-3 text-center'>News Detail</h1>
    <div className='h-1 w-full  bg-secondary mt-3 mb-3'></div>
    <h4 className="title text-warning font-bold text-2xl mb-2 text-center">
          {news.newstitle.toUpperCase()}
          </h4>
  {desc.map((detail,index)=><div  key={index} className="row fw-bold text-center  flex justify-content-center">{detail}</div>)}
 
       
        
    </div>
 
  );
};

export default NewsDetail;
