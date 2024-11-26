import { modalStore } from '../../../stores/modalStore/ModalStore';

const CancelButton = () => {
  return <button onClick={() => modalStore.closeModal()}>Cancel</button>;
};

export default CancelButton;
