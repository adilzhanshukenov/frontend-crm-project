import { observer } from 'mobx-react-lite';
import { useRouteParams } from '../../../utils/useRouteParams';
import { useEffect, useState } from 'react';
import CancelButton from '../../shared/buttons/cancel-button/CancelButton';
import { ProjectStageFormData } from '../../../stores/stageStore/types';
import rootStore from '../../../stores/rootStore/RootStore';
import { Button, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

const AddStageProjectForm: React.FC = observer(() => {
  const { projectId, companyId } = useRouteParams();
  const { modalStore, stageStore } = rootStore;
  const [formData, setFormData] = useState<ProjectStageFormData>({ project: projectId, stage: '', order: 0 });

  useEffect(() => {
    stageStore.fetchAllStages(companyId);
  }, [companyId, stageStore]);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const convertOrderFormData = { ...formData, order: Number(formData.order) };
    await stageStore.addStageToProject(convertOrderFormData);
    stageStore.fetchStagesOfProject(projectId);
    modalStore.closeModal();
  };

  const companyStages = stageStore.stageList.map((stage) => (
    <MenuItem key={stage._id} value={stage._id}>
      {stage.name}
    </MenuItem>
  ));

  return (
    <form className="modal-form" onSubmit={handleFormSubmit}>
      <h2>Add stage</h2>
      <div className="modal-form-inputs">
        <Select
          label="Stage"
          value={formData.stage}
          name="stage"
          onChange={handleChange}
          sx={{
            '& .MuiInputLabel-root': {
              color: 'black', // Optional, in case nested styling is needed
            },
          }}
        >
          <MenuItem disabled value="">
            Select stage
          </MenuItem>
          {companyStages}
        </Select>
        <TextField
          label="Order"
          placeholder="Type order of stage"
          name="order"
          type="number"
          value={formData.order}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" variant="contained">
        Add stage
      </Button>
      <CancelButton onClick={() => stageStore.fetchStagesOfProject(projectId)} />
    </form>
  );
});

export default AddStageProjectForm;
