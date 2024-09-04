import React from 'react';
import { Link } from 'react-router-dom';
import SchemeImg from '../ui/SchemeImg';

const SchemeInfoCard = ({ scheme }) => {
  return (
    <Link
    to={`specific-scheme/${scheme._id}`}
      className="my-3 flex cursor-pointer border shadow flex-col gap-4 rounded-2xl  p-4 transition-all hover:bg-gray-300 md:flex-row"
      key={scheme._id} style={{backdropFilter: 'blur(5px) saturate(2) '}}
    >
      <div className="flex w-full shrink-0 bg-gray-300 sm:h-32 sm:w-32 " >
        <SchemeImg scheme={scheme} />
      </div>
      <div className="">
        <h2 className="text-lg md:text-xl">{scheme.schemename}</h2>
        <p className="line-clamp-3 mt-2 text-sm">Scheme Type: {scheme.schemetype.toUpperCase()}</p>
        <p className="line-clamp-3 mt-2 text-sm">Benefit For: {scheme.beneficialgroup.toUpperCase()}</p>
        <p className="line-clamp-3 mt-2 text-sm">Expiry Date: {scheme.validatedate.slice(0,10)}</p>
      </div>
    </Link>
  );
};

export default SchemeInfoCard;
