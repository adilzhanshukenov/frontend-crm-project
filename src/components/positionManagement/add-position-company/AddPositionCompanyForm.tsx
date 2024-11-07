import { useParams } from 'react-router-dom';
import './addpositioncompany.css';
import { useEffect, useState } from 'react';
import Button from '../../shared/button/Button';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import './addpositioncompany.css';
import { positionStore } from '../../../stores/positionStore/PositionStore';
import { Position, PositionFormData } from '../../../stores/positionStore/types';

interface PositionFormProps {
  position?: Position | null;
}

const AddPositionCompanyForm: React.FC<PositionFormProps> = ({ position }) => {
  const { companyId } = useParams<{ companyId: string }>();

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
    <form className="position-company-form" onSubmit={handleFormSubmit}>
      <h2>{position ? 'Update position' : 'Add position'}</h2>
      <div className="position-form-inputs">
        <label>Position:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="position-form-inputs">
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </div>
      <button type="submit">{position ? 'Update position' : 'Add position'}</button>
      <Button title="Cancel" onClick={() => modalStore.closeModal()} />
    </form>
  );
};

export default AddPositionCompanyForm;
