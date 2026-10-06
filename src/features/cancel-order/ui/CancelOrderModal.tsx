import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface CancelOrderModalProps {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
}

export const CancelOrderModal = ({ open, onClose, onCancel }: CancelOrderModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>注文取消</DialogTitle>
      <DialogContent>
        <DialogContentText>注文取消を行います</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>閉じる</Button>
        <Button variant='contained' onClick={onCancel}>
          同意する
        </Button>
      </DialogActions>
    </Dialog>
  );
};
