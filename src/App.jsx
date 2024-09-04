import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import AdminRegisterPage from './pages/adminpages/AdminRegisterPage';
import AdminLoginPage from './pages/adminpages/AdminLoginPage';
import axiosInstance from './utils/axios';
import { UserProvider } from './providers/UserProvider';
import {  SchemeProvider } from './providers/SchemeProvider';
import { getItemFromLocalStorage } from './utils';
import NotFoundPage from './pages/NotFoundPage';
import { AdminProvider } from './providers/AdminProvider';
import AdminLayout from './components/admincomponent/AdminLayout';
import LoginPage from './pages/userpages/LoginPage';
import RegisterPage from './pages/userpages/RegisterPage';
import UserLayout from './components/usercomponent/UserLayout';
import IndexPage from './pages/userpages/IndexPage';
import UserProfilePage from './pages/userpages/UserProfilePage';
import AdminProfilePage from './pages/adminpages/AdminProfilePage';
import UsersPage from './pages/adminpages/UsersPage';
import SchemesPage from './pages/adminpages/SchemesPage';
import SingleUserPage from './pages/adminpages/SingleUserPage';
import AddSchemeFormPage from './pages/adminpages/AddSchemeFormPage';
import SingleSchemePage from './pages/adminpages/SingleSchemePage';
import SpecificSchemePage from './pages/userpages/SpecificSchemePage';
import SingleSchemeuPage from './pages/userpages/SingleSchemeuPage';
import AllSchemePage from './pages/userpages/AllSchemePage';
import SchemeApplyForm from './pages/userpages/SchemeApplyForm';
import UserAppliedScheme from './pages/userpages/UserAppliedScheme';
import AppliedSchemeDetail from './pages/userpages/AppliedSchemeDetail';
import SchemeAppliedUsers from './pages/adminpages/SchemeAppliedUsers';
import UserAppliedSchemeDetail from './pages/adminpages/UserAppliedSchemeDetail';
import UserScheme from './pages/adminpages/UserScheme';
import NewsPage from './pages/userpages/NewsPage';
import NewsPageadmin from './pages/adminpages/NewsPageadmin';
import AddNewsPage from './pages/adminpages/AddNewsPage';
import NewsDetailadmin from './pages/adminpages/NewsDetailadmin';
import NewsDetail from './components/usercomponent/NewsDetail';
import AboutUs from './components/ui/AboutUs';

function App() {
  useEffect(() => {
    // set the token on refreshing the website
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${getItemFromLocalStorage('usertoken')}`;
  }, []);

  return (
    
      <AdminProvider>
      <UserProvider>
        <SchemeProvider>
        
          <Routes>
            
            <Route  path="/" element={<UserLayout/>}>
            <Route index element={<IndexPage />} /> 
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<UserProfilePage />} />
            <Route path="/scheme/:type" element={<SpecificSchemePage />} />
            <Route path="/:id" element={<SingleSchemeuPage/>} />
            <Route path="/apply-scheme/:id" element={<SchemeApplyForm/>} />
            <Route path="/scheme" element={<AllSchemePage/>} />
            <Route path="/account/userscheme" element={<UserAppliedScheme/>} />
            <Route path="/appliedschemedetail/:id" element={<AppliedSchemeDetail/>} />
            <Route path="/news" element={<NewsPage/>} />
            <Route path="/single-news/:id" element={<NewsDetail/>} />
            <Route path="/aboutus" element={<AboutUs/>} />
            </Route>


            <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<SchemesPage/>} />
            <Route path="/admin/addscheme/" element={<AddSchemeFormPage />} />
            <Route path="/admin/alluser" element={<UsersPage />} />
            <Route path="/admin/update-scheme/:id" element={<AddSchemeFormPage />} />
            <Route path="/admin/specific-scheme/:id" element={<SingleSchemePage />} />
            <Route path="/admin/alluser/specific-user/:id" element={<SingleUserPage />} />
            <Route path="/admin/adminaccount" element={<AdminProfilePage />}/>
            <Route path="/admin/appliedschemeusers/:id" element={<SchemeAppliedUsers />} />
            <Route path="/admin/userappliedschemedetail/:id" element={<UserAppliedSchemeDetail/>} />
            <Route path="/admin/userscheme/:id" element={<UserScheme/>} />
            <Route path="/admin/adminlogin" element={<AdminLoginPage />} />
              <Route path="/admin/adminregister" element={<AdminRegisterPage />} />
              <Route path="/admin/news" element={<NewsPageadmin/>} />
              <Route path="/admin/addnews/" element={<AddNewsPage/>} />
              <Route path="/admin/update-news/:id" element={<AddNewsPage/>} />
              <Route path="/admin/single-news/:id" element={<NewsDetailadmin />} />
            </Route> 
    
              <Route path="*" element={<NotFoundPage />} />
            
          </Routes>
          <ToastContainer autoClose={2000} transition={Slide} />
        </SchemeProvider>
      </UserProvider>
      </AdminProvider>
    
  );
}

export default App;
