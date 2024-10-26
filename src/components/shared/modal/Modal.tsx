import { observer } from 'mobx-react-lite';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import './modal.css';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = observer(({ title, children }) => {
  if (!modalStore.isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          {title && <h2>{title}</h2>}
          <button className="close-button" onClick={() => modalStore.closeModal()}>
            X
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
});

export default Modal;
