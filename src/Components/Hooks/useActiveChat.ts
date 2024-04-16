const useActiveChat = () => {
  const [chatDocRef, setChatDocRef] = useState<
    DocumentReference<DocumentData, DocumentData>
  >(doc(db, "chats/mainChat"));
  const { email: dialogPartnerEmail } = useAppSelector(selectDialogPartner);
};
