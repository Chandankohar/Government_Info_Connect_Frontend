import { useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';

import { UserContext } from '@/providers/UserProvider';
//import { PlaceContext } from '@/providers/PlaceProvider';
import { AdminContext } from '@/providers/AdminProvider';

import { getItemFromLocalStorage, setItemsInLocalStorage, removeItemFromLocalStorage } from '@/utils';
import axiosInstance from '@/utils/axios';
import { SchemeContext } from '@/providers/SchemeProvider';

//ADMIN
export const useAuthAdmin = () => {
    return useContext(AdminContext)
}

export const useProvideAuthAdmin = () => {
    const [admin, setAdmin] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedAdmin = getItemFromLocalStorage('admin');
        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }
        setLoading(false)
    }, [])

    const register = async (formData) => {
        const { name,citizenid,joiningid,municipality,email,contact,address, password } = formData;

        try {
            const { data } = await axiosInstance.post('admin/register', {
                name,
                citizenid,
                joiningid,
                municipality,
                email,
                contact,
                address,
                password,
            });
            if (data.admin && data.token) {
                setAdmin(data.admin)
                // save user and token in local storage
                setItemsInLocalStorage('admin', data.admin)
                setItemsInLocalStorage('admintoken', data.token)
            }
            return { success: true, message: 'Registration successfull' }
        } catch (error) {
            const { message } = error.response.data
            return { success: false, message }
        }
    }

    const login = async (formData) => {
        const { joiningid, password } = formData;

        try {
            const { data } = await axiosInstance.post('admin/login', {
                joiningid,
                password,
            });
            if (data.admin && data.token) {
                setAdmin(data.admin)
                // save user and token in local storage
                setItemsInLocalStorage('admin', data.admin)
                setItemsInLocalStorage('admintoken', data.token)
            }
            return { success: true, message: 'Login successfull' }
        } catch (error) {
            const { message } = error.response.data
            return { success: false, message }
        }
    }

   
    const logout = async () => {
        try {
            const { data } = await axiosInstance.get('/admin/logout');
            if (data.success) {
                setAdmin(null);

                // Clear user data and token from localStorage when logging out
                removeItemFromLocalStorage('admin');
                removeItemFromLocalStorage('admintoken');
            }
            return { success: true, message: 'Logout successfull' }
        } catch (error) {
            console.log(error)
            return { success: false, message: 'Something went wrong!' }
        }
    }

    const uploadPicture = async (picture) => {
        try {
            const formData = new FormData()
            formData.append('picture', picture)
            const { data } = await axiosInstance.post('/admin/upload-picture', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }
    const updateAdmin= async (adminDetails) => {
        const { name,email,address,contact, picture } = adminDetails;
        const joiningid = JSON.parse(getItemFromLocalStorage('admin')).joiningid
        try {
            const { data } = await axiosInstance.put('/admin/update-admin', {
                name,email,address,contact, picture,joiningid,
            })
             if (data.admin && data.token) {
                setAdmin(data.admin)
                // save user and token in local storage
                setItemsInLocalStorage('admin', data.admin)
                setItemsInLocalStorage('admintoken', data.token)
            }
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    


    return {
        admin,
        setAdmin,
        register,
        login,
       
        logout,
        loading,
        uploadPicture,
         updateAdmin
    }
}


// USER
export const useAuth = () => {
    return useContext(UserContext)
}

export const useProvideAuth = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = getItemFromLocalStorage('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false)
    }, [])

    const register = async (registerData) => {
        const { name,citizenid,addedPhotos,address,municipality, email,contact, password, } = registerData;

        try {
            const { data } = await axiosInstance.post('user/register', {
                name,
                citizenid,
                addedPhotos,
                address,
                municipality, 
                email,
                contact,
                password,
            });
            if (data.user && data.token) {
                setUser(data.user)
                // save user and token in local storage
                setItemsInLocalStorage('user', data.user)
                setItemsInLocalStorage('usertoken', data.token)
            }
            return { success: true, message: 'Registration successfull' }
        } catch (error) {
            const { message } = error.response.data
            return { success: false, message }
        }
    }

    const login = async (formData) => {
        const { citizenid, password } = formData;

        try {
            const { data } = await axiosInstance.post('user/login', {
                citizenid,
                password,
            });
            if (data.user && data.token) {
                setUser(data.user)
                // save user and token in local storage
                setItemsInLocalStorage('user', data.user)
                setItemsInLocalStorage('usertoken', data.token)
            }
            
            return { success: true, message: 'Login successfull' }
        } catch (error) {
            const { message } = error.response.data
            return { success: false, message }
        }
    }

    

    const logout = async () => {
        try {
            const { data } = await axiosInstance.get('/user/logout');
            if (data.success) {
                setUser(null);

                // Clear user data and token from localStorage when logging out
                removeItemFromLocalStorage('user');
                removeItemFromLocalStorage('usertoken');
            }
            return { success: true, message: 'Logout successfull' }
        } catch (error) {
            console.log(error)
            return { success: false, message: 'Something went wrong!' }
        }
    }

    const uploadPicture = async (picture) => {
        try {
            const formData = new FormData()
            formData.append('picture', picture)
            const { data } = await axiosInstance.post('/user/upload-picture', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = async (userDetails) => {
        const { name,email,address,contact, picture } = userDetails;
        const citizenid = JSON.parse(getItemFromLocalStorage('user')).citizenid
        try {
            const { data } = await axiosInstance.put('/user/update-user', {
                name,email,address,contact, picture,citizenid,
            })
             if(data.success){
            setUser(data.user)
            setItemsInLocalStorage('user', data.user)
            setItemsInLocalStorage('usertoken', data.token)
           }
            return data;
        } catch (error) {
            console.log(error)
        }
    }


    return {
        user,
        setUser,
        register,
        login,
        
        logout,
        loading,
        uploadPicture,
        updateUser
    }
}


// PLACES
export const useScheme = () => {
    return useContext(SchemeContext)
}

export const useProvideScheme = () => {
    const [scheme, setscheme] = useState([]);
    const [loading, setLoading] = useState(true);

     const getScheme= async () => {
        try{
         const { data } = await axiosInstance.get('/scheme/');
        
         setscheme([...data.scheme].reverse());
         setLoading(false);
        } catch (error) {
            console.log(error);
          }
    };


    
   

    return {
        scheme,
        setscheme,
        getScheme,
        loading,
        setLoading,
      
    }
}
