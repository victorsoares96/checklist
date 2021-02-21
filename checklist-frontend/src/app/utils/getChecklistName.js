export default function getChecklistName(checklistID, checklistArray) {
  return checklistArray.find(checklist => checklist._id === checklistID)?.nome
}