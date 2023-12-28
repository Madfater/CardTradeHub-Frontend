// EditProductDialog.tsx
import React, { useState } from 'react';
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
  onSave: (updatedProduct: { quantity: number; price: number; description: string; }) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({ open, onClose, onSave }) => {

  const { isOpen, openDialog, closeDialog } = useDialog();
  const [editedProduct, setEditedProduct] = useState({
    quantity: 0,
    price: 0,
    description: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value,
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
          name="quantity"
          label="數量"
          type="number"
          fullWidth
          value={editedProduct.quantity}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="價格"
          type="number"
          fullWidth
          value={editedProduct.price}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="描述"
          type="string"
          fullWidth
          value={editedProduct.description}
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
