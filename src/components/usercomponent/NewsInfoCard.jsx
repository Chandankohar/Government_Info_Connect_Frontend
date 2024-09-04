import React from 'react';
import { Link } from 'react-router-dom';


const NewsInfoCard = ({ news}) => {

  return (
    <Link to={`/single-news/${news._id}`}
    
      className="my-3 flex justify-content-between border cursor-pointer shadow flex-col gap-4 rounded-2xl  p-4 transition-all hover:bg-gray-600 md:flex-row"
      key={news._id} style={{backdropFilter: 'blur(8px) saturate(5) '}} 
    >
       <div><div className="text-lg md:text-xl text-warning">{news.newstitle.toUpperCase()}</div>

       <div className="text-lg md:text-xl">{news.newsdescription.slice(0,40)}</div></div>
       <div className="mt-2 text-sm">{news.date.slice(0,10)}</div>
       
      
    </Link>
  );
};

export default NewsInfoCard;
