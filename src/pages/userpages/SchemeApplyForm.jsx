import PhotosUploader from '@/components/ui/PhotosUploader';
import { useAuth } from '../../../hooks'
import React, {  useState } from 'react'
import { toast } from 'react-toastify';
import axiosInstance from '@/utils/axios';
import { Navigate } from 'react-router-dom';


const SchemeApplyForm = (props) => {
  const [redirect, setRedirect] = useState(false);
  
const  {user}=useAuth()
const [addedPhotos, setAddedPhotos] = useState([]);
const {scheme}=props

const arr=scheme.documentrequired.split(',')
const [formData, setFormData] = useState({
  schemeid:scheme._id,
  userid:user._id,
  schemename:scheme.schemename,
  schemetype:scheme.schemetype,
  username: user.name,
  usercitizenid:user.citizenid,
  phone:'',
  address:'',
  
  
});
const {
  schemename, 
  schemetype, 
  username, 
  usercitizenid, 
  phone,
  address,
 
} = formData;

const isValidPlaceData = () => {
  if (schemename.trim() === '') {
    toast.error("Scheme Name can't be empty!");
    return false;
  } else if (username.trim() === '') {
    toast.error("username can't be empty!");
    return false;
  } else if (addedPhotos.length != arr.length) {
    toast.error('Upload only'+arr+'docunent! or document field must not be empty');
    return false;
  } 
  else if (phone.length<10) {
    toast.error("phone number can't be less than 10!");
    return false;
  } 
 
  else if (address.trim() === '') {
    toast.error("address can't be empty!");
    return false;
  } 
  return true;
};

const handleFormData = (e) => { 
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
 
};

const handelOnclick=async(e)=>{
  e.preventDefault()
  const schemeData = { ...formData, addedPhotos };
 
  if(isValidPlaceData()){
  
  const { data } = await axiosInstance.post(
    '/appliedscheme/',
    schemeData,
  );
  if(data.result){
    toast.success('User already applied this scheme');
    return
  }
  data.appliedscheme && toast.success('succesfully add the scheme');
  
 setRedirect(true);

}
  
}
if (redirect) {
  return <Navigate to={'/'} />;
}



  return (
    <div className='mt-4 flex grow items-center justify-around p-4 md:p-0'>
      
      <div className="mb-40 border p-10 "style={{backdropFilter: 'blur(8px) saturate(5)'}} >
  <form className='mx-auto max-w-md'  >
  <h1 className='fw-bold mb-4 mt-3 fs-4  text-center text-warning'>Apply and Get Benefit of The Scheme</h1>

  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">Name of Scheme</label>
    <input type="email" className="form-control" id="exampleFormControlInput1" value={schemename} name='schemename' onChange={handleFormData}  readOnly/>

  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">Scheme Type</label>
    <input type="text" className="form-control" id="exampleFormControlInput1" value={schemetype} name='schemetype' onChange={handleFormData} readOnly/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">Name of User</label>
    <input type="email" className="form-control" id="exampleFormControlInput1" value={username} name='username' onChange={handleFormData} readOnly/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">Citizenship Id of User</label>
    <input type="email" className="form-control" id="exampleFormControlInput1" value={usercitizenid} name='usercitizenid' onChange={handleFormData} readOnly/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">Address</label>
    <input type="text" className="form-control" id="exampleFormControlInput1" value={address} name='address' onChange={handleFormData} />
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">Phone Number </label>
    <input type='number' className="form-control" id="exampleFormControlInput1" minLength={10} value={phone} name='phone' onChange={handleFormData} />
  </div>
 
  
 

  
   <div className="form-group" >
    <label htmlFor="exampleFormControlTextarea1">Upload {scheme.documentrequired.toUpperCase()} Document</label>
    <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />
  </div>
  
   <button type="submit" className="btn mt-3 text-white  btn-primary" onClick={handelOnclick} >Submit</button>
</form>
</div>
    </div>
  )
}

export default SchemeApplyForm
