
import LoginPage from '../userpages/LoginPage';
import { useAuth } from '../../../hooks';
import EducationImg from '../../assets/education-picture.png'
import JobsImg from '../../assets/jobs-picture.png'
import AgricultureImg from '../../assets/Agriculture-picture.png'
import HealthImg from '../../assets/Health-picture.png'
import RecentScheme from '@/components/usercomponent/RecentScheme';
import { Link } from 'react-router-dom';
import Spinner from '@/components/ui/Spinner';
const IndexPage = () => {
 
   const auth=useAuth()
  

  if (auth.loading) {
    return <Spinner />;
  }

  return (
    
    <>
    
    {auth.user?(
      <div>
     
      <h1 className='text-end me-20 font-bold'>Hello {auth.user.name}</h1> 

        
      
    <div className="row ml-20 mt-10 me-20 grid  rounded-4 grid-cols-1 text-white justify-content-evenly border shadow  md:grid-cols-2 md:gap-1 lg:grid-cols-4 lg:gap-2 xl:grid-cols-4 xl:gap-10"style={{backdropFilter: 'blur(8px) saturate(5) '}}>
  <Link to={'/scheme/education'} className="  p-4 item-center  md:m-2  xl:m-0  ">
       
        <img src={EducationImg} alt='education'   />
        <h1 className="card-title fs-4 fw-bold  text-warning text-center">EDUCATION</h1>
        <p className=" text-truncate card-text text-center ">Unlock and Brighten your Education Knowledge with Government Power.</p> 
  </Link>
  <Link to={'/scheme/health'} className="   md:m-2  xl:m-0  rounded ">
  <img src={HealthImg} alt='HealthImg' height={180} width={180} />
        <h5 className="card-title fs-4 fw-bold  text-warning text-center">HEALTH</h5>

        <p className=" text-truncate card-text text-center">Get your Health support with Government new scheme.</p> 
  </Link>
  <Link to={'/scheme/agriculture'} className="  p-4  md:m-2 xl:m-0  ">
  <img src={AgricultureImg} alt='AgricultureImg'  />
        <h5 className="card-title fs-4 fw-bold  text-warning text-center">AGRICULTURE</h5>
        <p className="text-truncate card-text text-center">Don't think about flood, focus on more crop production.</p>
  </Link>
  <Link to={'/scheme/job'} className="   p-4  md:m-2 xl:m-0   ">
  <img src={JobsImg} alt='jobs'  /> 
        <h5 className="card-title fs-4 fw-bold text-warning text-center ">JOB</h5>
        <p className=" text-truncate card-text text-center">Unlock your Job potential with Governmental Power.</p>
  </Link>
</div>
   <RecentScheme/> 
    </div>
):(<LoginPage/>)}

</>
);
};

export default IndexPage;
