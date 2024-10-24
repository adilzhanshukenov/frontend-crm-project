import React, { useState } from 'react';
import { companyStore } from '../../../stores/companyStore/CompanyStore';
import { Company } from '../../../stores/companyStore/types';
import { userStore } from '../../../stores/userStore/UserStore';
import './createcompanyform.css';
import { modalStore } from '../../../stores/modalStore/ModalStore';

export const CreateCompanyForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [industry, setIndustry] = useState('');

  const companyData: Company = {name, address, industry};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

     // Simulate API call
     setTimeout(() => {
      companyStore.createNewCompany(companyData);
      companyStore.fetchAllCompanies();
     
      modalStore.closeModal();

      // Optionally reset form state
      setName('');
      setAddress('');
      setIndustry('');
    }, 500);

    console.log({ name, address, industry });
  };

  return (
    <form className='create-company-form' onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Industry:</label>
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={userStore.loading}>
        {userStore.loading ? 'Creating Company' : 'Create Company'}
      </button>
    </form>
  );
};
