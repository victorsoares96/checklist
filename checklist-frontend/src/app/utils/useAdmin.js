import { useContext } from 'react';

import AdminContext from '../contexts/adminContext';

const useAdmin = () => {
  const admin = useContext(AdminContext);
  return admin;
}

export default useAdmin;