import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import PhotosUploader from '@/components/ui/PhotosUploader';




const RegisterPage = () => {
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [formData, setFormData] = useState({
    name:'',
    citizenid:'',
    address:'',
    municipality:'', 
    email:'', 
    contact:'',
    password:'',
  });
  const [redirect, setRedirect] = useState(false);
  const auth = useAuth();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const isValidUserData = () => {
    if (formData.citizenid.trim() === '') {
      toast.error("citizenid can't be empty!");
      return false;
    } else if (formData.address.trim() === '') {
      toast.error("Address can't be empty!");
      return false;
    } else if (addedPhotos.length > 2||addedPhotos.length > 2) {
      toast.error('Upload at most 1 or 2 photos!');
      return false;
    } else if (formData.municipality.trim() === '') {
      toast.error("municipality can't be empty!");
      return false;
    } else if (formData.email.trim() === '') {
      toast.error('email is required!');
      return false;
    } else if (formData.name.trim() === '') {
      toast.error("name is required");
      return false;
    }
    else if (formData.contact.trim() === '') {
      toast.error("contact is required");
      return false;
    }

    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formDataIsValid = isValidUserData();
    // console.log(isValidPlaceData());
    const registerData = { ...formData, addedPhotos };
if(formDataIsValid){
    const response = await auth.register(registerData);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
  }
  };

  

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 flex grow items-center justify-around p-4 md:p-0">
      <div className="mb-40 border p-10 "style={{backdropFilter: 'blur(8px) saturate(5) '}}>
        <h1 className="mb-4 text-center text-4xl">Register</h1>
        <form className="mx-auto max-w-md" onSubmit={handleFormSubmit}>
        <label htmlFor="user_name">Name</label>
          <input
            name="name"
            type="text"
            className='text-black'
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleFormData}
            id='user_name'
          />
        <label htmlFor="citizen_id">Citizenship ID</label>
          <input
            name="citizenid"
            type="text"
            className='text-black'
            placeholder="Enter your citizenship id"
            value={formData.citizenid}
            onChange={handleFormData}
            id='citizen_id'
          />
        <label htmlFor="citizen_photo">Citizenship Photo</label>
          <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />
        <label htmlFor="permanent_address">Permanent Address</label>
        <input
            name="address"
            className='text-black'
            id='permanent_address'
            type="text"
            placeholder="Enter your permanent address"
            value={formData.address}
            onChange={handleFormData}
          />
        <label htmlFor="municipality">Municipality</label>
          <input
            name="municipality"
            className='text-black'
            id='municipality'
            type="text"
            placeholder="Enter your municipality"
            value={formData.municipality}
            onChange={handleFormData}
            />
          <label htmlFor="contact">Contact</label>
          <input
            name="contact"
            className='text-black'
            id='contact'
            type="text"
            placeholder="Enter your contact number"
            value={formData.contact}
            onChange={handleFormData}
          />
        <label htmlFor="email">Email</label>
          <input
            name="email"
            className='text-black'
            id='email'
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleFormData}
          />
        <label htmlFor="password">Password</label>
          <input
            name="password"
            className='text-black'
            type="password"
            id='password'
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleFormData}
          />
          <button className="primary my-2">Register</button>
        </form>

    
        <div className="py-2 text-center text-white">
          <label htmlFor="existing_user">Already a member? </label>
          <Link id='existing_user' className="text-warning underline ms-1" to={'/login'}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
