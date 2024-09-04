import React from 'react';
import { Link } from 'react-router-dom';


const UserAppliedInfoCard = ({ appliedscheme }) => {
  return (
    <Link
    to={`/appliedschemedetail/${appliedscheme._id}`}
      className="my-3 flex justify-content-between text-white   border cursor-pointer shadow flex-col gap-4 rounded-2xl  p-4 transition-all hover:bg-gray-600  md:flex-row"
      key={appliedscheme._id} style={{backdropFilter: 'blur(8px) saturate(6) '}}
    >
         
        <div > 
        <div className="text-lg text-warning  md:text-xl">{appliedscheme.schemename}</div>
        <div className="line-clamp-3 mt-2 text-sm">Scheme Type: {appliedscheme.schemetype.toUpperCase()}</div>
        <div className="line-clamp-3 mt-2 text-sm">Applied Date: {appliedscheme.date.slice(0,10)}</div>
        </div>
        <div>
          {appliedscheme.status=='rejected'?(<label className=" bg-danger text-black bg-gradient rounded border border-secondary p-0.5 ">Rejected</label>):appliedscheme.status=='null'?(
        <label className=" bg-warning bg-gradient rounded text-black border border-secondary p-0.5 ">Pending...</label>):
        (<label className=" bg-success bg-gradient rounded text-black border border-secondary p-0.5">Approved</label>)}
        
        </div>
      
    </Link>
  );
};

export default UserAppliedInfoCard;
