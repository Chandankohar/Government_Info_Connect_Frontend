import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const SingleUserPage = () => {
    const { id } = useParams();
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!id) {
      return '';
    }

    setLoading(true);

    const getUser = async () => {
      const { data } = await axiosInstance.get(`/admin/specific-user/${id}`);
      setuser(data.user);
      setLoading(false);
    };
    getUser();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return;
  }

  return (
    <div className='container mt-3 border p-5  mt-3 shadow rounded' style={{backdropFilter: 'blur(5px) saturate(3) '}}>
      <h1 className='font-bold text-center fs-3 mt-5 '>User Detail</h1>
     <section className="py-5">
  <div className="container">
    <div className="row gx-5">
      <aside className="col-lg-5">
        <div className="border w-50 rounded-xl mb-3  " style={{backdropFilter: 'blur(5px) saturate(2) '}}>
          <a data-fslightbox="mygalley" className="rounded-xl" target="_blank" data-type="image" href={user.picture}>
            <img style={{margin:'auto',maxHeight:'70vh'}} className=" rounded-xl  img-fluid " src={user.picture} />
          </a>
        </div>
        
       
      </aside>
      <main className="col-lg-6">
        <div className="ps-lg-3">
          <h4 className="title text-black font-bold text-2xl mb-2">
          {user.name.toUpperCase()}
          </h4>
          <div className="title text-black font-bold  mb-1"> Details</div>

          <div className="row  mb-3 ">
          <dt className="col-5">Citizenship Id:</dt>
          <dd className="col-3">{user.citizenid}</dd>
            <dt className="col-5">Permanent Address:</dt>
            <dd className="col-3">{user.address}</dd>
        
            <dt className="col-5">Municipality:</dt>
            <dd className="col-3">{user.municipality.toUpperCase()}</dd>

            <dt className="col-5">Email:</dt>
            <dd className="col-3"> {user.email}</dd>

            <dt className="col-5">Citizenship Document:</dt>
            <hr />
      <dd className=' grid grid-cols-1  justify-items-center  md:grid-cols-1 md:gap-1 lg:grid-cols-1 lg:gap-2 xl:grid-cols-2 xl:gap-3'>
     { user.citizenshipphoto.map((photo,index)=>{ return(
      <a data-fslightbox="mygalley" key={index} className="m-4 flex flex-col md:m-2 xl:m-0 shadow rounded-xl w-100 h-100 " target="_blank" data-type="image" href={photo}>
      <img className='shadow rounded-xl p-3' style={{minWidth:'100%',margin:'auto',minHeight:'100%'}}  src={photo}/></a>)})
      }
</dd>
           
          </div>

          
         
        </div>
      </main>
    </div>
  </div>
</section>
</div>
  )
}

export default SingleUserPage
