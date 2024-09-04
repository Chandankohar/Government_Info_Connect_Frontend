import React from 'react';
import { Link } from 'react-router-dom';
import UserImg from '../ui/UserImg';


const UserInfoCard = ({ users }) => {
  return (
    <div
      
      className="my-3 shadow flex cursor-pointer border p-3 flex-col gap-4 rounded-2xl transition-all hover:bg-gray-300 md:flex-row"
      key={users._id} style={{backdropFilter: 'blur(5px) saturate(3) '}}
    >
      <div className="flex w-full shrink-0  sm:h-32 sm:w-32 ">
        <UserImg users={users} />
      </div>
      <div className="">
        <h2 className="text-lg md:text-xl">{users.name.toUpperCase()}</h2>
        <p className="line-clamp-3 mt-1 text-sm">Citizenship Id:{users.citizenid}</p>
        <p className="line-clamp-3 mt-1 mb-3 text-sm">Address:{users.address}</p>
        <Link to={`specific-user/${users._id}`} className="bg-gray-600 hover:bg-blue-600 ps-3 pe-3 rounded-xl text-white" variant="secondary">  
                See User Detail
         </Link>
        <Link to={`/admin/userscheme/${users._id}`} className="bg-gray-600 hover:bg-blue-600 ps-3 ms-3 pe-3 rounded-xl text-white" variant="secondary" >
               
                See user Scheme
        </Link>
       
      </div>
    </div>
  );
};

export default UserInfoCard;
