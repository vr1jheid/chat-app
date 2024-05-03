export const getDiaLogPartner = (
  dialogMembers: string[],
  currentUserEmail: string
) => {
  if (dialogMembers.length > 2) {
    return null;
  }
  const dialogPartner = dialogMembers.find((m) => m !== currentUserEmail);
  return dialogPartner ?? null;
};
