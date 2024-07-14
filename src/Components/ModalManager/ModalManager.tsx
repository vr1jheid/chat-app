import { Modal } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { closeModal, selectModalState } from "../../Store/Modal/modalSlice";

export const ModalManager = () => {
  const dispatch = useAppDispatch();
  const { type } = useAppSelector(selectModalState);

  const onClose = () => {
    dispatch(closeModal());
  };

  const isOpen = Boolean(type);

  const modalContent = () => {
    switch (type) {
      case "userInfo":
        break;

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
