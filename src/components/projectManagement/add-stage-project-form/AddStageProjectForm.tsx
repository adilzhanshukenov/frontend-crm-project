import { observer } from 'mobx-react-lite';
import { useRouteParams } from '../../../utils/useRouteParams';
import { useEffect, useState } from 'react';
import CancelButton from '../../shared/cancel-button/CancelButton';
import { ProjectStageFormData } from '../../../stores/stageStore/types';
import rootStore from '../../../stores/rootStore/RootStore';

const AddStageProjectForm: React.FC = observer(() => {
  const { projectId, companyId } = useRouteParams();
  const { modalStore, stageStore } = rootStore;
  const [formData, setFormData] = useState<ProjectStageFormData>({ project: projectId, stage: '', order: 0 });

  useEffect(() => {
    stageStore.fetchAllStages(companyId);
  }, [companyId, stageStore]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    <option key={stage._id} value={stage._id}>
      {stage.name}
    </option>
  ));

  return (
    <form className="modal-form" onSubmit={handleFormSubmit}>
      <div className="modal-form-inputs">
        <label>Stage:</label>
        <select name="stage" value={formData.stage} onChange={handleChange}>
          <option value="">Select stage</option>
          {companyStages}
        </select>
        <label>Order:</label>
        <input name="order" type="number" value={formData.order} onChange={handleChange} />
      </div>
      <button type="submit">Add stage</button>
      <CancelButton />
    </form>
  );
});

export default AddStageProjectForm;
