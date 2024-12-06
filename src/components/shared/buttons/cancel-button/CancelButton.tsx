import rootStore from '../../../../stores/rootStore/RootStore';
import { Button } from '@mui/material';

interface CancelButtonProps {
  onClick: () => void;
}

const CancelButton = ({ onClick }: CancelButtonProps) => {
  const { modalStore } = rootStore;
  return (
    <Button
      variant="outlined"
      onClick={() => {
        onClick();
        modalStore.closeModal();
      }}
    >
      Cancel
    </Button>
  );
};

export default CancelButton;
