import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './addpositioncompany.css';
import { Position, PositionFormData } from '../../../stores/positionStore/types';
import { useRouteParams } from '../../../utils/useRouteParams';
import CancelButton from '../../shared/cancel-button/CancelButton';
import rootStore from '../../../stores/rootStore/RootStore';

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
      <div className="modal-form-inputs">
        <label>Position:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="modal-form-inputs">
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </div>
      <button type="submit">{position ? 'Update position' : 'Add position'}</button>
      <CancelButton />
    </form>
  );
});

export default AddPositionCompanyForm;
