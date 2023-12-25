import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useDialog from "../Hooks/useDialog";

interface TextDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
	Text: string;
}

const TextDialog: React.FC<TextDialogProps> = ({
  open,
  onClose,
  onConfirm,
	Text
}) => {
  const { isOpen, openDialog, closeDialog } = useDialog();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>{Text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary" autoFocus>
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TextDialog;
