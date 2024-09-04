import React, { useEffect } from 'react';
import {  useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuthAdmin } from '../../../hooks';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { FaBell } from 'react-icons/fa';

export const AdminHeader = () => {
  const auth = useAuthAdmin();
  const location = useLocation();

   const [hasShadow, setHasShadow] = useState(false);
   const { admin } = auth;

  const handleScroll = () => {
    const shouldHaveShadow = window.scrollY > 0;
    setHasShadow(shouldHaveShadow);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  return (
    <>
    <header
      className={`fixed top-0 z-10 flex w-screen border justify-center   py-2 ${
        hasShadow ? 'shadow-md' : ''
      }`}
      style={{backdropFilter: 'blur(3px) saturate(2)'}}>
      <div
        className={`flex ${
          admin ? 'justify-left ms-20 ' : 'justify-left px-10'
        } w-screen max-w-screen-xl`}
      >
        <Link to={''} className="flex items-center me-10 ">
          <img
            className="h-10 w-10 md:h-14 md:w-14"
            src="../../../src/assets/GovInfoConnect_Logo.png"
            alt="Logo"
          />

          <span className="hidden text-2xl font-bold me-5 text-red-500 md:block" style={{color:'black'}}>
            GOVINFOCONNECT
          </span>
        </Link>
     { admin &&  (<Link className='scheme  mt-3 hover:text-blue-600 me-10 font-bold' to={''}>
      <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="h-4 w-4 ms-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        Scheme
      </Link>)}
      
     { admin && (<Link className='hover:text-blue-600 mt-3  font-bold' to={`alluser`}>
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="h-4 w-4 ms-2 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
       User
      </Link>)}
      { admin && <Link className='hover:text-blue-600 mt-3 ml-8 font-bold' to='/admin/news'><FaBell  className='w-4 h-4  ms-2 ml-3 md:ml-10' />News</Link>}

      
            <div className='w-50'></div>

        <Link
          to={admin ? 'adminaccount' : '/admin/adminlogin'}
          className=" flex   items-center gap-3 me-10 rounded-full border-gray-300 py-1 px-1  md:border"
        >
         

          <div className="z-10 h-[35px] w-[35px] overflow-hidden rounded-full">
            {admin ? (
              <Avatar>
                {admin?.picture ? (
                  <AvatarImage src={admin.picture} className="h-full w-full" />
                ) : (
                  <AvatarImage
                    src="https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png"
                    className="h-full w-full"
                  />
                )}
              </Avatar>
            ) : (
              <svg
                fill="#858080"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="796 796 200 200"
                enableBackground="new 796 796 200 200"
                xmlSpace="preserve"
                stroke="#858080"
                className="h-8 w-8"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M896,796c-55.14,0-99.999,44.86-99.999,100c0,55.141,44.859,100,99.999,100c55.141,0,99.999-44.859,99.999-100 C995.999,840.86,951.141,796,896,796z M896.639,827.425c20.538,0,37.189,19.66,37.189,43.921c0,24.257-16.651,43.924-37.189,43.924 s-37.187-19.667-37.187-43.924C859.452,847.085,876.101,827.425,896.639,827.425z M896,983.86 c-24.692,0-47.038-10.239-63.016-26.695c-2.266-2.335-2.984-5.775-1.84-8.82c5.47-14.556,15.718-26.762,28.817-34.761 c2.828-1.728,6.449-1.393,8.91,0.828c7.706,6.958,17.316,11.114,27.767,11.114c10.249,0,19.69-4.001,27.318-10.719 c2.488-2.191,6.128-2.479,8.932-0.711c12.697,8.004,22.618,20.005,27.967,34.253c1.144,3.047,0.425,6.482-1.842,8.817 C943.037,973.621,920.691,983.86,896,983.86z"></path>{' '}
                </g>
              </svg>
            )}
          </div>
        </Link>
      </div>
      <br className="border border-gray-600" />
      
    </header>
    
    </>
  );
};
