import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../../shared/button/Button';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import './addpositioncompany.css';
import { positionStore } from '../../../stores/positionStore/PositionStore';
import { Position, PositionFormData } from '../../../stores/positionStore/types';
import { useRouteParams } from '../../../utils/useRouteParams';

interface PositionFormProps {
  position?: Position | null;
}

const AddPositionCompanyForm: React.FC<PositionFormProps> = observer(({ position }) => {
  const { companyId } = useRouteParams();

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
      <Button title="Cancel" onClick={() => modalStore.closeModal()} />
    </form>
  );
});

export default AddPositionCompanyForm;
