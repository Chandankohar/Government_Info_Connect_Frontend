import { createContext } from 'react';

import { useProvideAuthAdmin } from '../../hooks';

const initialState = {
  admin: null,
  setAdmin:null,
  register: () => {},
  login: () => {},
  updateAdmin:()=>{},
  uploadPicture:()=>{},
  logout: () => {},
  loading: true,
};

export const AdminContext = createContext(initialState);

export const AdminProvider = ({ children }) => {
  const adminauth = useProvideAuthAdmin();

  return <AdminContext.Provider value={adminauth}>{children}</AdminContext.Provider>;
};
