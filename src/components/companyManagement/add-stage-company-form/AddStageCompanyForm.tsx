import { useEffect, useState } from 'react';
import { useRouteParams } from '../../../utils/useRouteParams';
import './addstagecompany.css';
import CancelButton from '../../shared/buttons/cancel-button/CancelButton';
import { Stage, StageFormData } from '../../../stores/stageStore/types';
import rootStore from '../../../stores/rootStore/RootStore';
import { Button, TextField } from '@mui/material';

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
      <TextField
        className="text-field"
        variant="outlined"
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <TextField
        className="text-field"
        variant="outlined"
        label="Description"
        type="text"
        value={formData.description}
        name="description"
        onChange={handleChange}
      />
      <div className="modal-buttons">
        <Button variant="contained" type="submit">
          {modalStore.mode === 'edit' ? 'Edit stage' : 'Add stage'}
        </Button>
        <CancelButton onClick={() => stageStore.fetchAllStages(companyId)} />
      </div>
    </form>
  );
};

export default AddStageCompanyForm;
