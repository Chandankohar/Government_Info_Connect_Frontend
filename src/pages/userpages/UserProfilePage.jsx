import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useAuth } from '../../../hooks';

import EditProfileDialog from '@/components/ui/EditProfileDialog';
import UserAccountNav from '@/components/usercomponent/UserAccountNav';


const UserProfilePage = () => {
  const auth = useAuth();
  const { user, logout } = auth;
  
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (!subpage) {
    subpage = 'profile';
  }

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success(response.message);
      setRedirect('/login');
      
    } else {
      toast.error(response.message);
    }
  };

  if (!user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <UserAccountNav />
      {subpage === 'profile' && (
        <div className="m-4 flex flex-col items-center  border gap-8 rounded-[10px]  p-4 sm:h-1/5 sm:flex-row sm:items-stretch lg:gap-28 lg:pl-32 lg:pr-20"style={{backdropFilter: 'blur(5px) saturate(5) '}}>
          {/* avatar */}
          <div className="flex h-40 w-40 justify-center rounded-full bg-gray-200 p-4  sm:h-72 sm:w-72 md:h-96 md:w-96">
            <Avatar>
              {user.picture ? (
                <AvatarImage src={user.picture} />
              ) : (
                <AvatarImage src="https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png" className="object-cover"/>
              )}

              <AvatarFallback>{user.name.slice([0], [1])}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex grow flex-col items-center gap-10 sm:items-start sm:justify-around sm:gap-0">
            <div className="flex flex-col  items-center gap-2 sm:items-start" style={{color:"white"}}>
              <div className="flex items-center gap-2">
                <div className="text-xl">
                  <span>Name: </span>
                  <span className="">{user.name.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xl">
                  <span>Citizenship Id: </span>
                  <span className="">{user.citizenid}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xl">
                  <span>Municipality: </span>
                  <span className="">{user.municipality?.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xl">
                  <span>Address: </span>
                  <span className="">{user.address}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xl">
                  <span>Email: </span>
                  <span className="">{user.email}</span>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-around sm:justify-end sm:gap-5 md:gap-10">
             
              <EditProfileDialog />

              <button className="bg-gray-600 hover:bg-blue-600 ps-3 pe-3 rounded-xl text-white" variant="secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    
    </div>
  );
};

export default UserProfilePage;
