import React, { useEffect, useState } from 'react';
import { Company, CompanyFormData } from '../../../stores/companyStore/types';
import { userStore } from '../../../stores/userStore/UserStore';
import './createcompanyform.css';

interface CompanyFormProps {
  company?: Company | null;
  onSubmit: (companyData: Company) => void;
  handleClose: () => void; // Called after user creation to close modal and refetch users
}

export const CreateCompanyForm: React.FC<CompanyFormProps> = ({ company, onSubmit, handleClose }) => {
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
    <form className="create-company-form" onSubmit={handleSubmit}>
      <h2>{company ? 'Update company' : 'Create company'}</h2>
      <div className="company-form-inputs">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="company-form-inputs">
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <div className="company-form-inputs">
        <label>Industry:</label>
        <input type="text" name="industry" value={formData.industry} onChange={handleChange} required />
      </div>
      <button type="submit" disabled={userStore.loading}>
        {company ? 'Update' : 'Create'}
      </button>
      <button type="button" onClick={handleClose}>
        Cancel
      </button>
    </form>
  );
};
