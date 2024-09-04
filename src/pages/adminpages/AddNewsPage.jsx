import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '@/utils/axios';
import Spinner from '@/components/ui/Spinner';
const AddNewsPage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    newstitle: '',
    newsdescription: '',
    
    
  });

  const {
    newstitle,
    newsdescription,
    
  } = formData;

  const isValidNewsData = () => {
    if (newstitle.trim() === '') {
      toast.error("News Title can't be empty!");
      return false;
    } else if (newsdescription.trim() === '') {
      toast.error("News Description can't be empty!");
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
    axiosInstance.get(`/news/single-news/${id}`).then((response) => {
      const { news } = response.data;
      // update the state of formData
      for (let key in formData) {
        if (news.hasOwnProperty(key)) {
          setFormData((prev) => ({
            ...prev,
            [key]: news[key],
          }));
        }
      }

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

  const saveNews = async (e) => {
    e.preventDefault();

    const formDataIsValid = isValidNewsData();
    
    // Make API call only if formData is valid
    if (formDataIsValid) {
      if (id) {
        const { data } = await axiosInstance.put('/news/update-news', {
          id,
          ...formData,
        });
        toast.success(data.message);
      } else {
        const { data } = await axiosInstance.post(
          '/news/adminnews',
          formData,
        );
        data.news && toast.success(' news added succesfully');
       }
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={'/admin/news'} />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="  mt-4 flex grow items-center justify-around p-4 md:p-0 ">
    
    <div  className='mb-40 border p-10' style={{backdropFilter: 'blur(8px) saturate(5) '}}>
    <h1 className='font-bold text-center fs-3  '>Add a News/Notification</h1>
      <form className='mx-auto max-w-md' onSubmit={saveNews} >
        {preInput(
          'Titel of News',
        )}
        <input
          type="text"
          name="newstitle"
          value={newstitle}
          onChange={handleFormData}
          placeholder="Enter News Title"
        />

        
        {preInput('Description', 'All details about the Recent News Please seperate the line with /n')}
        <textarea
          value={newsdescription}
          name="newsdescription"
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

export default AddNewsPage;
