import { Modal } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { closeModal, selectModalState } from "../../../Store/Modal/modalSlice";
import { UserInfoModal } from "../ModalContent/UserInfoModal";

export const ModalManager = () => {
  const dispatch = useAppDispatch();
  const { type } = useAppSelector(selectModalState);

  const mockAuthor = {
    displayName: "ZerO",
    email: "terekhovt@gmail.com",
    avatarURL:
      "https://lh3.googleusercontent.com/a/ACg8ocIuQiTtEM0db5ezW8Tu3QqOxeUgGEQTq3VlMDCPPm6j-63jZ7Lg=s96-c",
  };

  const onClose = () => {
    dispatch(closeModal());
  };

  const isOpen = Boolean(type);

  const modalContent = () => {
    switch (type) {
      case "userInfo":
        return <UserInfoModal userInfo={mockAuthor} />;

      default:
        return null;
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="w-fit h-fit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {modalContent()}
      </div>
    </Modal>
  );
};
