import { observer } from 'mobx-react-lite';
import './modal.css';
import rootStore from '../../../stores/rootStore/RootStore';

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = observer(({ children }) => {
  const { modalStore } = rootStore;
  if (!modalStore.activeModal) return null; // Do not render if no modal is active

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
});

export default Modal;
