import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectStatusStore } from '../../../stores/projectStatusStore/ProjectStatusStore';
import Button from '../../shared/button/Button';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import { projectStore } from '../../../stores/projectStore/ProjectStore';
import './createprojectform.css';
import { observer } from 'mobx-react-lite';

interface CreateProjectFormProps {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  company: string | undefined;
}

const CreateProjectForm: React.FC = observer(() => {
  const { companyId } = useParams<{ companyId: string }>();

  const [formData, setFormData] = useState<CreateProjectFormProps>({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    status: '',
    company: companyId,
  });

  useEffect(() => {
    projectStatusStore.getProjectStatuses();
    projectStore.fetchProjectsOfCompany(companyId);
  }, [companyId]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const converDatesFormData = {
      ...formData,
      start_date: new Date(formData.start_date),
      end_date: new Date(formData.end_date),
    };
    console.log(converDatesFormData);
    await projectStore.addProject(converDatesFormData);

    projectStore.fetchProjectsOfCompany(companyId);
    modalStore.closeModal();
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const projectStatuses = projectStatusStore.projectStatuses.map((projectStatus) => (
    <option key={projectStatus} value={projectStatus}>
      {projectStatus}
    </option>
  ));

  return (
    <form className="modal-form" onSubmit={handleFormSubmit}>
      <h2>Create project</h2>
      <div className="modal-form-inputs">
        <label>Name:</label>
        <input name="name" value={formData.name} type="text" onChange={handleChange} />
      </div>
      <div className="modal-form-inputs">
        <label>Description:</label>
        <input name="description" value={formData.description} type="text" onChange={handleChange} />
      </div>
      <div className="modal-form-inputs">
        <label>Start date:</label>
        <input name="start_date" value={formData.start_date} type="date" onChange={handleChange} />
      </div>
      <div className="modal-form-inputs">
        <label>End date:</label>
        <input name="end_date" value={formData.end_date} type="date" onChange={handleChange} />
      </div>
      <div className="modal-form-inputs">
        <label>Status:</label>
        <select value={formData.status} name="status" onChange={handleChange}>
          <option>Select status</option>
          {projectStatuses}
        </select>
      </div>
      <button type="submit">Create</button>
      <Button title="Cancel" onClick={() => modalStore.closeModal()} />
    </form>
  );
});

export default CreateProjectForm;
