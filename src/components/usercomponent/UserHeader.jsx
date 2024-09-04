import React, { useEffect } from 'react';
import {  useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBell } from "react-icons/fa";
import { RiFileListLine } from "react-icons/ri";
import { RiTeamFill } from "react-icons/ri";


import { useAuth } from '../../../hooks';
import SearchBar from './SearchBar';
import { Avatar, AvatarImage} from '@radix-ui/react-avatar';

export const UserHeader = () => {
  const auth = useAuth();
  const location = useLocation();

   const [showSearchBar, setShowSearchBar] = useState(true);
   const [hasShadow, setHasShadow] = useState(false);
   const { user } = auth;

  const handleScroll = () => {
    const shouldHaveShadow = window.scrollY > 0;
    setHasShadow(shouldHaveShadow);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // hide searchbar based on url
    if (location.pathname === '/scheme') {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
  //   // clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  return (
    < >
    <header
      className={`fixed top-0 z-10 pe-3 flex w-screen  border justify-content-center   py-2 ${
        hasShadow ? 'shadow-md' : ''
      }`}
      style={{backdropFilter: 'blur(4px) saturate(5)'}}>
      <div
        className={`flex ${
          user ? 'justify-right ml-5 md:ml-20 ' : 'justify-left px-10'
        } w-screen max-w-screen-xl`}
      >
        <a href="/" className="flex items-center me-5">
          <img
            className="h-10 w-15 md:h-14 md:w-18  "
            src="../../../src/assets/GovInfoConnect_Logo.png"
            alt="Logo"
          />

          <span className="hidden text-2xl font-bold ml-5 me-5  text-red-500 md:block" style={{color:'white'}}>
           GOVINFOCONNECT
          </span>
        </a>

        {showSearchBar && <SearchBar />}
        {!showSearchBar && <div className='flex  w-2/4 overflow-hidden  md:w-1/2'></div>  }
{user &&<Link  to={'/scheme'} >
<RiFileListLine title='Scheme' className='w-6 h-6 mt-3 ml-3 text-white  md:ml-10' />
</Link>}
<Link  to={'/news'} >
<FaBell title='Notification'  className='w-6 h-6 text-white  mt-3 ml-3 md:ml-10' />
</Link>
<Link to='/aboutus'> <RiTeamFill title='About us' className='w-6 h-6 text-white  mt-3 ml-3 md:ml-10'/></Link>
        <Link
          to={user ? '/account' : '/login'} title='Profile'
          className=" width-auto height-full flex  ml-3  items-center text-white   md:ml-20  rounded-full border-gray-300 py-1 px-2 md:border "
        >
         

          <div className="z-10 h-[35px] w-[35px]  overflow-hidden rounded-full">
            {user ? (
              <Avatar>
                {user?.picture ? (
                  <AvatarImage src={user.picture} className="h-full w-full" />
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
