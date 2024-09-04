import React from 'react';
import { Link } from 'react-router-dom';

const SchemeCard = ({ scheme }) => {
  const { _id: schemeId, photos, schemename, schemetype, beneficialgroup,validatedate } = scheme;
  return (
    <Link to={`/${schemeId}`} className="m-4  flex border flex-col  md:m-2 xl:m-0 shadow  rounded-2xl"style={{backdropFilter: 'blur(10px) saturate(10) '}}>
      
        {photos?.[0] && (
          <img
            src={`${photos?.[0]}`}
            className="h-2/3 w-full rounded-xl object-cover"
          />
        )}
        <h2 className="text-truncate  text-warning font-bold pl-2 mt-2">{schemename}</h2>
        <h3 className="text-truncate text-sm font-semibold mt-2  pl-2">Type: {schemetype.toUpperCase()}</h3>
        <div className=" pl-2">
          <span className="font-semibold">Benefit for: {beneficialgroup} </span>
          <p className="font-semibold">Expiry Date: {validatedate.slice(0,10)} </p>
         
        </div>
      
    </Link>
  );
};

export default SchemeCard;
