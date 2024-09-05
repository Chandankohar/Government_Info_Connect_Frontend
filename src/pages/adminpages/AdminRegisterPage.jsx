import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Navigate } from 'react-router-dom';
import { useAuthAdmin } from '../../../hooks';


const AdminRegisterPage = () => {
  const [formData, setFormData] = useState({
    name:'',
    citizenid:'',
    joiningid:'',
    municipality:'',
    email:'',
    contact:'',
    address:'',
    password:'',
  });
  const [redirect, setRedirect] = useState(false);
  const auth = useAuthAdmin();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await auth.register(formData);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
  };

  

  if (redirect) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="mt-4 flex grow items-center justify-around p-4 md:p-0">
      <div className="mb-40 border p-10" style={{backdropFilter: 'blur(5px) saturate(3) '}}>
        <h1 className="mb-4 text-center text-4xl">Register</h1>
        <form className="mx-auto max-w-md" onSubmit={handleFormSubmit}>
        <label htmlFor="admin_name">Name</label>
          <input
            name="name"
            type="text"
            id='admin_name'
            placeholder="Enter your Name"
            value={formData.name}
            onChange={handleFormData} required
          />
        <label htmlFor="admin_citizenid">Citizenship ID</label>
          <input
            name="citizenid"
            id='admin_citizenid'
            type="text"
            placeholder="Enter your Citizenship ID"
            value={formData.citizenid}
            onChange={handleFormData}
            required
          />
        <label htmlFor="admin_joiningid">Joining ID</label>
          <input
            name="joiningid"
            type="text"
            id='admin_joiningid'
            placeholder="Enter the joining ID given by the Organization"
            value={formData.joiningid}
            onChange={handleFormData}
            required
          />
        <label htmlFor="admin_municipality">Municipality</label>
          <input
            name="municipality"
            id='admin_municipality'
            type="text"
            placeholder="Enter Municipaliy where you work"
            value={formData.municipality}
            onChange={handleFormData}
            required
          />
          
        <label htmlFor="admin_email">Email</label>
          <input
            name="email"
            id='admin_email'
            type="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleFormData}
            required
          />
          <label htmlFor="contact">Contact</label>
          <input
            name="contact"
            id='contact'
            type="text"
            placeholder="Enter your Contact Number"
            value={formData.contact}
            onChange={handleFormData}
            required
          />
        <label htmlFor="admin_address">Permanent Address</label>
          <input
            name="address"
            id='admin_address'
            type="text"
            placeholder="Enter your Permanent Address"
            value={formData.address}
            onChange={handleFormData}
            required
          />
        <label htmlFor="admin_password">Password</label>
          <input
            name="password"
            id='admin_password'
            type="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleFormData}
            required
          />
          <button className="primary my-2">Register</button>
        </form>

       
        <div className="py-2 text-center text-black">
          Already an admin member?
          <Link className="text-danger underline ms-1" to={'/admin/adminlogin'}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
