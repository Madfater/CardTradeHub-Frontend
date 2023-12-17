// useDialog.ts
import { useState } from 'react';

interface UseDialogResult {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const useDialog = (): UseDialogResult => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openDialog,
    closeDialog,
  };
};

export default useDialog;
