import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import './companylist.css';
import { CreateCompanyForm } from '../../components/companyManagement/create-company-form/CreateCompanyForm';
import HeaderTitle from '../../components/shared/header-title/HeaderTitle';
import CompanyCard from '../../components/companyManagement/company-card/CompanyCard';
import Modal from '../../components/shared/modal/Modal';
import { companyStore } from '../../stores/companyStore/CompanyStore';
import { modalStore } from '../../stores/modalStore/ModalStore';
import { Company } from '../../stores/companyStore/types';
import Button from '../../components/shared/button/Button';
import ConfirmationModal from '../../components/shared/confirmation-modal/ConfirmationModal';

const CompanyList: React.FC = observer(() => {
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);

  useEffect(() => {
    companyStore.fetchAllCompanies();
  }, []);

  const navigate = useNavigate();

  const handleOpenModalForCreate = () => {
    modalStore.currectCompany = null;
    modalStore.openAnyModal({ mode: 'create', activeModal: 'createEditCompany' });
  };

  const handleOpenModalForEdit = () => {
    modalStore.openAnyModal({ mode: 'edit', activeModal: 'createEditCompany' });
  };

  const openDeleteConfirmation = (company: Company | null) => {
    setCompanyToDelete(company);
  };

  const handleConfirmDelete = () => {
    if (companyToDelete !== null) {
      companyStore.deleteCompany(companyToDelete);
      setCompanyToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setCompanyToDelete(null);
  };

  const handleFormSubmit = async (companyData: Company) => {
    if (modalStore.mode === 'edit') {
      await companyStore.updateCompany(companyData);
    } else {
      await companyStore.createNewCompany(companyData);
    }
    companyStore.fetchAllCompanies();
    modalStore.closeModal();
  };

  if (companyStore.loading) return <p>Loading...</p>;
  if (companyStore.error) return <p>Error: {companyStore.error}</p>;

  //   const handleDelete = async (companyId: string | undefined) => {
  //     await companyStore.deleteCompany(companyId);
  //     companyStore.fetchAllCompanies();
  //   };

  const handleCompanyClick = (company: Company) => {
    companyStore.setSelectedCompany(company);
    navigate(`/companies/${company._id}`);
  };

  const handleCompanySettingsClick = (company: Company) => {
    navigate(`/companies/${company._id}/settings`);
  };

  const handleCompanyCreated = () => {
    companyStore.fetchAllCompanies();
    modalStore.closeModal();
    // Refetch users after user creation
  };

  const companyList = (
    <div>
      <ul className="list-style">
        {companyStore.companyList?.map((company) => (
          <li key={company._id} onClick={() => handleCompanyClick(company)}>
            <CompanyCard
              onSettings={() => {
                handleCompanySettingsClick(company);
              }}
              onEdit={() => {
                modalStore.currectCompany = company;
                handleOpenModalForEdit();
              }}
              onDelete={() => openDeleteConfirmation(company)}
              company={company}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <div className="company-title-area">
        <HeaderTitle title="Company List" />
        <Button title="Create Company" onClick={handleOpenModalForCreate} />
      </div>

      {companyList}

      <Modal>
        {modalStore.activeModal === 'createEditCompany' && (
          <CreateCompanyForm
            company={modalStore.currectCompany}
            onSubmit={handleFormSubmit}
            handleClose={handleCompanyCreated}
          />
        )}
      </Modal>
      {companyToDelete !== null && (
        <ConfirmationModal
          message="Are you sure you want to delete this company?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
});

export default CompanyList;
