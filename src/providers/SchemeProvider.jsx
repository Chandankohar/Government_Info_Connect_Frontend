import { createContext } from 'react';

import { useProvideScheme } from '../../hooks';

const initialState = {
  scheme: [],
  setscheme: () => {},
  loading: true,
  setLoading: () => {},
  getScheme:()=>{},
};

export const SchemeContext = createContext(initialState);

export const SchemeProvider = ({ children }) => {
  const allScheme = useProvideScheme();
  // const allPlaces = null;

  return (
    <SchemeContext.Provider value={allScheme}>{children}</SchemeContext.Provider>
  );
};
