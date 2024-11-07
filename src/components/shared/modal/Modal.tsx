import { observer } from 'mobx-react-lite';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import './modal.css';

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = observer(({ children }) => {
  if (!modalStore.activeModal) return null; // Do not render if no modal is active

  //if (!modalStore.isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
});

export default Modal;
