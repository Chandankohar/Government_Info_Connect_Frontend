import React from 'react';
 import { Link } from 'react-router-dom';


const NewsInfoCardadmin = ({news}) => {

  return (
    <Link  to={`/admin/single-news/${news._id}`}
    
      className="my-3 flex border justify-content-between cursor-pointer shadow flex-col gap-4 rounded-2xl  p-4 transition-all hover:bg-gray-300 md:flex-row"
      key={news._id} style={{backdropFilter: 'blur(5px) saturate(2) '}} 
    >
         
       
        <div><div className="text-lg md:text-xl">{news.newstitle.toUpperCase()}</div>
        <div className="text-md md:text-md">{news.newsdescription.slice(0,20)}...</div> </div>
        <div className="mt-2 text-sm">{news.date.slice(0,10)}</div>
       
       
       
      
    </Link>
  );
};

export default NewsInfoCardadmin;
