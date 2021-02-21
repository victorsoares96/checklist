import { useContext } from 'react';

import UnityContext from '../contexts/unityContext';

const useUnity = () => {
  const unity = useContext(UnityContext);
  return unity;
}

export default useUnity;