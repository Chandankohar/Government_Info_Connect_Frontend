import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '@/utils/axios';

import PhotosUploader from '@/components/ui/PhotosUploader';
import Spinner from '@/components/ui/Spinner';

const AddSchemeFormPage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);

  const [formData, setFormData] = useState({
    schemename: '',
    schemetype: '',
    description: '',
    beneficialgroup: '',
    validatedate: '',
    documentrequired: '',
    maxapplicant:0,
    
  });

  const {
    schemename,
    schemetype,
    description,
    beneficialgroup,
    validatedate,
    documentrequired,
    maxapplicant,
  } = formData;

  const isValidPlaceData = () => {
    if (schemename.trim() === '') {
      toast.error("Scheme Name can't be empty!");
      return false;
    } else if (schemetype.trim() === '') {
      toast.error("Type of scheme can't be empty!");
      return false;
    } else if (addedPhotos.length > 2) {
      toast.error('Upload at atmost 2 photos!');
      return false;
    } else if (description.trim() === '') {
      toast.error("Description can't be empty!");
      return false;
    } else if (beneficialgroup.trim() === '') {
      toast.error('Benificial for field is required!');
      return false;
    } else if (documentrequired.length <= 0) {
      toast.error("Document require to applied the scheme can't be empty");
      return false;
    }
    else if (validatedate > Date.now()|| validatedate.trim()==='') {
      toast.error("Valid upto date is require or not empty");
      return false;
    }
    else if (maxapplicant <= 0) {
      toast.error("the total no of applicant eligible must not be empty");
      return false;
    }

    return true;
  };

  const handleFormData = (e) => { 
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
   
  };

 useEffect(() => {
    if (!id) {
      return;
    }
   setLoading(true);
    axiosInstance.get(`/scheme/single-scheme/${id}`).then((response) => {
      const { scheme } = response.data;
      // update the state of formData
      for (let key in formData) {
        if (scheme.hasOwnProperty(key)) {
          setFormData((prev) => ({
            ...prev,
            [key]: scheme[key],
          }));
        }
      }

      //update photos state separately
     setAddedPhotos([...scheme.photos]);

     setLoading(false);
    });
 }, []);

  const preInput = (header, description) => {
    return (
      <>
        <h2 className="mt-4 text-2xl">{header}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </>
    );
  };

  const saveScheme = async (e) => {
    e.preventDefault();

    const formDataIsValid = isValidPlaceData();
    const schemeData = { ...formData, addedPhotos };

    // Make API call only if formData is valid
    if (formDataIsValid) {
      if (id) {
        const { data } = await axiosInstance.put('/scheme/update-scheme', {
          id,
          ...schemeData,
        });
        toast.success(data.message);
      } else {
        const { data } = await axiosInstance.post(
          '/scheme/add-scheme',
          schemeData,
        );
        data.scheme && toast.success('succesfully add the scheme');
       }
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={'/admin'} />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className=' mt-4 flex grow items-center justify-around p-4 md:p-0'>
    
    <div className='mb-40 border p-10' style={{backdropFilter: 'blur(8px) saturate(5) '}} >
    <h1 className='font-bold text-center fs-3  '>Add a new Scheme</h1>
      <form className='mx-auto max-w-md ' onSubmit={saveScheme} >
        {preInput(
          'Name of Scheme',
        )}
        <input
          type="text"
          name="schemename"
          value={schemename}
          onChange={handleFormData}
          placeholder="Enter Scheme Name"
        />

        {preInput('Scheme Type',)}
        <input
          type="text"
          name="schemetype"
          value={schemetype}
          onChange={handleFormData}
          placeholder="Type of Scheme: Ex:-Education,Health etc"
        />

        {preInput('Photos or Banner of Scheme',)}

        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

        {preInput('Description', 'All details about the scheme')}
        <textarea
          value={description}
          name="description"
          onChange={handleFormData}
        />

        

        {preInput('Benificial for', 'student,bussinessman,farmer, etc ')}
        <input
        type='text'
          value={beneficialgroup}
          name="beneficialgroup"
          onChange={handleFormData} 
        />
         {preInput('Valid Upto', 'Please write date in formate of yyyy-mm-dd')}
        <input
        type='date'
          value={validatedate.slice(0, 10)}
          name="validatedate"
          onChange={handleFormData}
        />
         {preInput('Document Required', 'Enter the document required to get the scheme please seprate with comma')}
        <input
        type='text'
          value={documentrequired}
          name="documentrequired"
          onChange={handleFormData} 
        />
         {preInput('maximum applicant', 'Enter the maximum no of applicant  to get the scheme')}
        <input
        type='number'
          value={maxapplicant}
          name="maxapplicant"
          onChange={handleFormData} 
        />
        <button className="mx-auto my-4 flex rounded-full bg-primary py-3 px-20 text-xl font-semibold text-white" >
          Save
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddSchemeFormPage;
