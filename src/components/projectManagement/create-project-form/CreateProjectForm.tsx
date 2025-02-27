import { FormEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './createprojectform.css';
import { observer } from 'mobx-react-lite';
import CancelButton from '../../shared/buttons/cancel-button/CancelButton';
import rootStore from '../../../stores/rootStore/RootStore';
import { Button, TextField } from '@mui/material';

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
  const { projectStore, modalStore } = rootStore;

  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<CreateProjectFormProps>({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    status: '',
    company: companyId,
  });

  useEffect(() => {
    projectStore.fetchProjectsOfCompany(companyId);
    firstInputRef.current?.focus();
  }, [companyId, projectStore]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const converDatesFormData = {
      ...formData,
      start_date: new Date(formData.start_date),
      end_date: new Date(formData.end_date),
    };
    await projectStore.addProject(converDatesFormData);

    projectStore.fetchProjectsOfCompany(companyId);
    modalStore.closeModal();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form className="modal-form" onSubmit={handleFormSubmit}>
      <h2>Create project</h2>
      <TextField
        autoFocus
        value={formData.name}
        onChange={handleChange}
        name="name"
        label="Name"
        placeholder="Type name of project"
        required={true}
        type="text"
      />

      <TextField
        value={formData.description}
        onChange={handleChange}
        name="description"
        label="Description"
        placeholder="Type name of project"
        required={false}
        type="text"
      />
      <TextField
        slotProps={{ inputLabel: { shrink: true } }}
        value={formData.start_date}
        onChange={handleChange}
        name="start_date"
        label="Start date"
        placeholder="Choose start date"
        required={true}
        type="date"
        variant="outlined"
      />
      <TextField
        slotProps={{ inputLabel: { shrink: true } }}
        value={formData.end_date}
        onChange={handleChange}
        name="end_date"
        label="End date"
        placeholder="Choose end date"
        required={false}
        type="date"
        variant="outlined"
      />
      <div className="modal-buttons">
        <Button variant="contained" type="submit">
          Create
        </Button>
        <CancelButton onClick={() => projectStore.fetchProjectsOfCompany(companyId)} />
      </div>
    </form>
  );
});

export default CreateProjectForm;
