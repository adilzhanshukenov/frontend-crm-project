import { observer } from 'mobx-react-lite';
import { useRouteParams } from '../../../utils/useRouteParams';
import { useEffect, useState } from 'react';
import CancelButton from '../../shared/buttons/cancel-button/CancelButton';
import { ProjectStageFormData } from '../../../stores/stageStore/types';
import rootStore from '../../../stores/rootStore/RootStore';
import { Button, MenuItem, SelectChangeEvent } from '@mui/material';
import SelectComponent from '../../shared/select/SelectComponent';

const AddStageProjectForm: React.FC = observer(() => {
  const { projectId, companyId } = useRouteParams();
  const { modalStore, stageStore, projectStore } = rootStore;

  const [formData, setFormData] = useState<ProjectStageFormData>({
    project: projectId,
    stage: '',
    default_user: '',
    order: 0,
  });

  useEffect(() => {
    stageStore.fetchAllStages(companyId);
    projectStore.fetchUsersOfProject(projectId);
  }, [companyId, projectId, stageStore, projectStore]);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await stageStore.addStageToProject(formData);
    await stageStore.fetchStagesOfProject(projectId);
    modalStore.closeModal();
  };

  const companyStages = stageStore.stageList.map((stage) => (
    <MenuItem key={stage._id} value={stage._id}>
      {stage.name}
    </MenuItem>
  ));

  const projectUsers = projectStore.projectUser.map((pu) => (
    <MenuItem key={pu._id} value={pu.user._id}>
      {pu.user.username}
    </MenuItem>
  ));

  return (
    <form className="modal-form" onSubmit={handleFormSubmit}>
      <h2>Add stage</h2>
      <SelectComponent
        title="Stage"
        label="Stage"
        name="stage"
        value={formData.stage}
        onChange={handleChange}
        items={companyStages}
        placeholder="Select stage"
      />

      <SelectComponent
        title="Default user"
        label="Default user"
        name="default_user"
        value={formData?.default_user}
        onChange={handleChange}
        items={projectUsers}
        placeholder="Select user"
      />
      <div className="modal-buttons">
        <Button type="submit" variant="contained">
          Add stage
        </Button>
        <CancelButton onClick={() => stageStore.fetchStagesOfProject(projectId)} />
      </div>
    </form>
  );
});

export default AddStageProjectForm;
