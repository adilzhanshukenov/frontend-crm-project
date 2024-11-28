import { useEffect, useState } from 'react';
import { useRouteParams } from '../../../utils/useRouteParams';
import './addstagecompany.css';
import CancelButton from '../../shared/cancel-button/CancelButton';
import { Stage, StageFormData } from '../../../stores/stageStore/types';
import rootStore from '../../../stores/rootStore/RootStore';

interface StageFormProps {
  stage?: Stage | null;
}

const AddStageCompanyForm: React.FC<StageFormProps> = ({ stage }) => {
  const { companyId } = useRouteParams();
  const { modalStore, stageStore } = rootStore;

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

  /**
   *
   * @param e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  /**
   *
   * @param e
   */
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
    <form className="modal-form" onSubmit={handleFormSubmit}>
      <h2>{modalStore.mode === 'edit' ? 'Edit stage' : 'Add stage'}</h2>
      <div className="modal-form-inputs">
        <label>Name: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>

      <div className="modal-form-inputs">
        <label>Description: </label>
        <textarea value={formData.description} name="description" onChange={handleChange} />
      </div>

      <button type="submit">{modalStore.mode === 'edit' ? 'Edit stage' : 'Add stage'}</button>
      <CancelButton />
    </form>
  );
};

export default AddStageCompanyForm;
