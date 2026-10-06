import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface RestoreOrderModalProps {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
}

export const RestoreOrderModal = ({ open, onClose, onCancel }: RestoreOrderModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>注文復元</DialogTitle>
      <DialogContent>
        <DialogContentText>注文復元を行います</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>閉じる</Button>
        <Button variant='contained' onClick={onCancel}>
          実行
        </Button>
      </DialogActions>
    </Dialog>
  );
};
