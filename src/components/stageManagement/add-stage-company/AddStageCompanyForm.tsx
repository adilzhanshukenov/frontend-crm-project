import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import { Stage, StageFormData } from '../../../stores/stageStore/types';
import { stageStore } from '../../../stores/stageStore/StageStore';
import './addstagecompany.css';
import Button from '../../shared/button/Button';

interface StageFormProps {
  stage?: Stage | null;
}

const AddStageCompanyForm: React.FC<StageFormProps> = ({ stage }) => {
  const { companyId } = useParams<{ companyId: string }>();

  const [formData, setFormData] = useState<StageFormData>({ name: '', description: '', company: companyId });

  useEffect(() => {
    if (stage) {
      setFormData({
        name: stage.name,
        description: stage.description,
        company: companyId,
      });
    }
  }, [stage, companyId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const stageData: Stage = stage ? { ...stage, ...formData } : { ...formData };

    if (modalStore.mode === 'edit') {
      await stageStore.updateStage(stageData);
    } else {
      await stageStore.addStageToCompany(stageData);
    }

    stageStore.fetchAllStages(companyId);
    modalStore.closeModal();
  };

  return (
    <form className="stage-company-form" onSubmit={handleFormSubmit}>
      <h2>{modalStore.mode === 'edit' ? 'Edit stage' : 'Add stage'}</h2>
      <div className="stage-form-inputs">
        <label>Name: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>

      <div className="stage-form-inputs">
        <label>Description: </label>
        <textarea value={formData.description} name="description" onChange={handleChange} />
      </div>

      <button type="submit">{modalStore.mode === 'edit' ? 'Edit stage' : 'Add stage'}</button>
      <Button title="Cancel" onClick={() => modalStore.closeModal()} />
    </form>
  );
};

export default AddStageCompanyForm;
