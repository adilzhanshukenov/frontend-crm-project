import rootStore from '../../../stores/rootStore/RootStore';

const CancelButton = () => {
  const { modalStore } = rootStore;
  return <button onClick={() => modalStore.closeModal()}>Cancel</button>;
};

export default CancelButton;
