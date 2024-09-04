import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useAuthAdmin } from '../../../hooks';
import EditAdminProfileDialog from '@/components/ui/EditAdminProfileDialog';


const AdminProfilePage = () => {
  const auth = useAuthAdmin();
  const { admin, logout } = auth;
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (!subpage) {
    subpage = 'profile';
  }

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success(response.message);
      setRedirect('/admin/adminlogin');
    } else {
      toast.error(response.message);
    }
  };

  if (!admin && !redirect) {
    return <Navigate to={'/admin/adminlogin'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
   
        <div className="m-4 flex flex-col items-center gap-8 rounded-[10px]  p-4 sm:h-1/5 sm:flex-row sm:items-stretch lg:gap-28 lg:pl-32 border lg:pr-20" style={{backdropFilter: 'blur(5px) saturate(2) '}}>
          {/* avatar */}
          <div className="flex h-40 w-40 justify-center rounded-full bg-gray-200 p-4  sm:h-72 sm:w-72 md:h-96 md:w-96">
            <Avatar>
              {admin.picture ? (
                <AvatarImage src={admin.picture} />
              ) : (
                <AvatarImage src="https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png" className="object-cover"/>
              )}

              <AvatarFallback>{admin.name.slice([0], [1])}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex grow flex-col items-center gap-10 sm:items-start sm:justify-around sm:gap-0">
            {/* user details */}
            <div className="flex flex-col  items-center gap-2 sm:items-start" style={{color:"black"}}>
              <div className="flex items-center gap-2">
                {/* <Text height="18" width="18" /> */}
                <div className="text-xl">
                  <span>Name: </span>
                  <span className="">{admin.name.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
               
                <div className="text-xl">
                  <span>Email: </span>
                  <span className="">{admin.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">

                <div className="text-xl">
                  <span>Address: </span>
                  <span className="">{admin.address}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xl">
                  <span>Citizenship Id: </span>
                  <span className="">{admin.citizenid}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                
                <div className="text-xl">
                  <span>Working Municipality: </span>
                  <span className="">{admin.municipality.toUpperCase()}</span>
                </div>
              </div>
            </div>
           

            <div className="flex w-full justify-around sm:justify-end sm:gap-5 md:gap-10">
            <EditAdminProfileDialog />
              <button className="bg-gray-600 hover:bg-blue-600 ps-3 pe-3 rounded-xl text-white" variant="secondary" onClick={handleLogout}> 
                Logout
              </button>
            </div>
          </div>
        </div>
      
     
    </div>
  );
};

export default AdminProfilePage;
