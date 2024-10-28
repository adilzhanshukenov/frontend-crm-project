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
        <button onClick={onConfirm} className="confirm-button">
          Yes
        </button>
        <button onClick={onCancel} className="cancel-button">
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
