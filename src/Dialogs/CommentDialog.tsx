import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import useDialog from '../Hooks/useDialog';

interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (Comment: { score: number; context: string; }) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({ open, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState({
    score: 0,
    context: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'score' ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    onSave(editedProduct);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>修改商品</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="score"
          label="分數"
          type="number"
          fullWidth
          value={editedProduct.score}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="context"
          label="內容"
          type="string"
          fullWidth
          value={editedProduct.context}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          取消
        </Button>
        <Button onClick={handleSave} color="primary">
          儲存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
