import { createContext } from 'react';

import { useProvideAuthAdmin } from '../../hooks';

const initialState = {
  admin: null,
  register: () => {},
  login: () => {},
  logout: () => {},
  loading: true,
};

export const AdminContext = createContext(initialState);

export const AdminProvider = ({ children }) => {
  const adminauth = useProvideAuthAdmin();

  return <AdminContext.Provider value={adminauth}>{children}</AdminContext.Provider>;
};
