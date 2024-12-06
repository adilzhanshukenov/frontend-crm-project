import React, { useEffect, useState } from 'react';
import { Company, CompanyFormData } from '../../../stores/companyStore/types';
import './createcompanyform.css';
import rootStore from '../../../stores/rootStore/RootStore';
import { TextField, Button } from '@mui/material';
import CancelButton from '../../shared/buttons/cancel-button/CancelButton';

interface CompanyFormProps {
  company?: Company | null;
  onSubmit: (companyData: Company) => void;
}

export const CreateCompanyForm: React.FC<CompanyFormProps> = ({ company, onSubmit }) => {
  const { userStore, companyStore } = rootStore;
  const [formData, setFormData] = useState<CompanyFormData>({ name: '', address: '', industry: '' });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name,
        address: company.address,
        industry: company.industry,
      });
    }
  }, [company]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const companyData = company ? { ...company, ...formData } : { ...formData };
    onSubmit(companyData);
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <h2>{company ? 'Update company' : 'Create company'}</h2>
      <TextField
        required
        className="text-field"
        label="Name"
        type="text"
        onChange={handleChange}
        placeholder="Type name of a company"
        value={formData.name}
        variant="outlined"
        name="name"
      />

      <TextField
        className="text-field"
        required
        label="Address"
        type="text"
        onChange={handleChange}
        placeholder="Type address of a company"
        value={formData.address}
        variant="outlined"
        name="address"
      />

      <TextField
        className="text-field"
        required
        label="Industry"
        type="text"
        onChange={handleChange}
        placeholder="Type industry of a company"
        value={formData.industry}
        variant="outlined"
        name="industry"
      />
      <Button variant="contained" type="submit" disabled={userStore.loading}>
        {company ? 'Update' : 'Create'}
      </Button>
      <CancelButton onClick={() => companyStore.fetchAllCompanies()} />
    </form>
  );
};
