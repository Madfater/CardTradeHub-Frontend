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

interface AddCardDialogProps {
	open: boolean;
	onClose: () => void;
	onSave: (addedCard: { actualCard: number; quantity: number; price: number; desc: string; }) => void;
}

const AddCardDialog: React.FC<AddCardDialogProps> = ({ open, onClose, onSave }) => {

	const [card, setCard] = useState({
		actualCard: 0,
		quantity: 0,
		price: 0,
		desc: ''
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setCard((prevCard) => ({
			...prevCard,
			[name]: name === 'quantity' || name === 'price' || name === 'actualCard' ? Number(value) : value,
		}));
	};

	const handleSave = () => {
		setCard({
			actualCard: 0,
			quantity: 0,
			price: 0,
			desc: ''
		})
		onSave(card);
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>修改商品</DialogTitle>
			<DialogContent>
				<TextField
					margin="dense"
					name="actualCard"
					label="卡號"
					type="number"
					fullWidth
					value={card.actualCard}
					onChange={handleInputChange}
				/>
				<TextField
					autoFocus
					margin="dense"
					name="quantity"
					label="數量"
					type="number"
					fullWidth
					value={card.quantity}
					onChange={handleInputChange}
				/>
				<TextField
					margin="dense"
					name="price"
					label="價格"
					type="number"
					fullWidth
					value={card.price}
					onChange={handleInputChange}
				/>
				<TextField
					margin="dense"
					name="desc"
					label="描述"
					type="string"
					fullWidth
					value={card.desc}
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

export default AddCardDialog;
