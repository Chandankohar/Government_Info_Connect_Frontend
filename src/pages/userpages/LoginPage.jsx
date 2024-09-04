import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks';
import UserProfilePage from './UserProfilePage';


const LoginPage = () => {
  const [formData, setFormData] = useState({ citizenid: '', password: '' });
  const [redirect, setRedirect] = useState(false);
  const auth = useAuth();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await auth.login(formData);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
  };

 

  if (redirect) {
    return <Navigate to={'/'} />;
   
  }

  if (auth.user) {
    return <UserProfilePage />;
  }

  return (
    <div className="mt-4 flex grow items-center  justify-around p-4 md:p-0">
      <div className="mb-40 border  p-20" style={{backdropFilter: 'blur(8px) saturate(5) '}}>
        <h1 className="mb-4 text-center text-4xl">Login</h1>
        <form className="mx-auto  max-w-md" onSubmit={handleFormSubmit}>
          <label htmlFor="citizenid">Citizenship ID</label>
          <input
            name="citizenid"
            className='text-black'
            type="text"
            placeholder="Enter the citizen id"
            value={formData.citizenid}
            onChange={handleFormData}
            id='citizenid'
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className='text-black'
            placeholder="password"
            value={formData.password}
            onChange={handleFormData}
            id='password'
          />
          <button className="primary my-4">Login</button>
        </form>


      

        <div className="py-2 text-center text-white">
          Don't have an account yet?{' '}
          <Link className="text-warning underline" to={'/register'}>
            Register now
          </Link>
        </div>
              <div className="flex w-full items-center gap-4">
                <div className="h-0 w-1/2 border-[1px]"></div>
                <p className="small -mt-1">or</p>
                <div className="h-0 w-1/2 border-[1px]"></div>
              </div>
        <div className="py-2 text-center text-white">
          Login as an admin{' '}
          <Link className="text-warning underline" to={'/admin/adminlogin'}>
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
