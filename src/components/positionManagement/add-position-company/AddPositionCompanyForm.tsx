import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './addpositioncompany.css';
import { Position, PositionFormData } from '../../../stores/positionStore/types';
import { useRouteParams } from '../../../utils/useRouteParams';
import CancelButton from '../../shared/buttons/cancel-button/CancelButton';
import rootStore from '../../../stores/rootStore/RootStore';
import { Button, TextField } from '@mui/material';

interface PositionFormProps {
  position?: Position | null;
}

const AddPositionCompanyForm: React.FC<PositionFormProps> = observer(({ position }) => {
  const { companyId } = useRouteParams();
  const { positionStore, modalStore } = rootStore;

  const [formData, setFormData] = useState<PositionFormData>({ company: companyId, name: '', description: '' });

  useEffect(() => {
    if (position) {
      setFormData({
        name: position.name,
        description: position.description,
        company: companyId,
      });
    }
  }, [position, companyId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const positionData: Position = position ? { ...position, ...formData } : { ...formData };

    if (modalStore.mode === 'edit') {
      await positionStore.updatePosition(positionData);
    } else {
      await positionStore.addPositionToCompany(positionData);
    }
    positionStore.fetchAllPositions(companyId);
    modalStore.closeModal();
  };
  return (
    <form className="modal-form" onSubmit={handleFormSubmit}>
      <h2>{position ? 'Update position' : 'Add position'}</h2>
      <TextField
        className="text-field"
        required
        variant="outlined"
        label="Position"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Type position"
      />
      <TextField
        className="text-field"
        required
        variant="outlined"
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Type description"
      />
      <Button variant="contained" type="submit">
        {position ? 'Update position' : 'Add position'}
      </Button>
      <CancelButton onClick={() => positionStore.fetchAllPositions(companyId)} />
    </form>
  );
});

export default AddPositionCompanyForm;
