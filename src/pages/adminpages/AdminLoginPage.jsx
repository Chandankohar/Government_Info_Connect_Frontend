import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthAdmin } from '../../../hooks';


const AdminLoginPage = () => {
  const [formData, setFormData] = useState({ joiningid: '', password: '' });
  const [redirect, setRedirect] = useState(false);
  const adminauth = useAuthAdmin();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await adminauth.login(formData);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
    
  };

  

  if (redirect) {
    return <Navigate to={'/admin'} />;
  }

  

  return (
    <div className="mt-4 flex grow items-center justify-around p-4 md:p-0">
      <div className="mb-40 border p-10" style={{backdropFilter: 'blur(5px) saturate(3) '}}>
        <h1 className="mb-4 text-center text-4xl">Login</h1>
        <form className="mx-auto max-w-md" onSubmit={handleFormSubmit}>
        <label htmlFor="joiningid"> User ID</label>
          <input
            name="joiningid"
            id='joiningid'
            type="text"
            placeholder="Enter your User ID"
            value={formData.joiningid}
            onChange={handleFormData}
          />
        <label htmlFor="password"> Enter your Password</label>
          <input
            name="password"
            type="password"
            id='password'
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleFormData}
          />
          <button className="primary my-4">Login</button>
        </form>


       

        <div className="py-2 text-center text-black">
          Create an admin account?{' '}
          <Link className="text-danger underline bg-blue" to={'/admin/adminregister'}>
            Create Admin
          </Link>
        </div>
      <div className="flex w-full items-center gap-4">
        <div className="h-0 w-1/2 border-[1px]"></div>
        <p className="small -mt-1">or</p>
        <div className="h-0 w-1/2 border-[1px]"></div>
      </div>
        <div className="py-2 text-center text-black">
          Back to user login {' '}
          <Link className="text-danger underline" to={'/login'}>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
