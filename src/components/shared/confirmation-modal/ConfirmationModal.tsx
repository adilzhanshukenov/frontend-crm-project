import { Button } from '@mui/material';
import './confirmationmodel.css';

export interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <Button variant="contained" onClick={onConfirm}>
          Yes
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          No
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
