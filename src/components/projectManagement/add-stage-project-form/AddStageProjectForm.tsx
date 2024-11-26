import { observer } from 'mobx-react-lite';
import { useRouteParams } from '../../../utils/useRouteParams';
import { useEffect, useState } from 'react';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import CancelButton from '../../shared/cancel-button/CancelButton';
import { ProjectStageFormData } from '../../../stores/projectStore/types';
import { projectStore } from '../../../stores/projectStore/ProjectStore';
import { companyStore } from '../../../stores/companyStore/CompanyStore';

const AddStageProjectForm: React.FC = observer(() => {
  const { projectId, companyId } = useRouteParams();
  const [formData, setFormData] = useState<ProjectStageFormData>({ project: projectId, stage: '', order: 0 });

  useEffect(() => {
    companyStore.fetchAllStages(companyId);
  }, [companyId]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const convertOrderFormData = { ...formData, order: Number(formData.order) };
    await projectStore.addStageToProject(convertOrderFormData);
    projectStore.fetchStagesOfProject(projectId);
    modalStore.closeModal();
  };

  const companyStages = companyStore.stageList.map((stage) => (
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
