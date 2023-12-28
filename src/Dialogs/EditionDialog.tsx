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
  onSave: (updatedProduct: { quantity: number; price: number; desc: string; }) => void;
  initialProduct: { quantity: number; price: number; desc: string; };
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({ open, onClose, onSave, initialProduct }) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [editedProduct, setEditedProduct] = useState({
    quantity: 0,
    price: 0,
    desc: ''
  });

  useEffect(() => {
    if (open) {
      // 若 open 為 true，表示 Dialog 將要打開，此時將 initialProduct 設定為預設值
      setEditedProduct(initialProduct);
    }
  }, [open, initialProduct]);

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
          name="desc"
          label="描述"
          type="string"
          fullWidth
          value={editedProduct.desc}
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
