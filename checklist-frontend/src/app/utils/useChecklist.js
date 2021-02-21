import { useContext } from 'react';

import ChecklistContext from '../contexts/checklistContext';

const useChecklist = () => {
  const checklist = useContext(ChecklistContext);
  return checklist;
}

export default useChecklist;