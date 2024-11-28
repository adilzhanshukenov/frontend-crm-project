import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import './companylist.css';
import { CreateCompanyForm } from '../../../components/companyManagement/create-company-form/CreateCompanyForm';
import HeaderTitle from '../../../components/shared/header-title/HeaderTitle';
import CompanyCard from '../../../components/companyManagement/company-card/CompanyCard';
import Modal from '../../../components/shared/modal/Modal';
import { Company } from '../../../stores/companyStore/types';
import Button from '../../../components/shared/button/Button';
import ConfirmationModal from '../../../components/shared/confirmation-modal/ConfirmationModal';
import { useAuth } from '../../../context/useAuth';
import rootStore from '../../../stores/rootStore/RootStore';

const CompanyList: React.FC = observer(() => {
  const { isAuthenticated } = useAuth();
  const { companyStore, modalStore } = rootStore;
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <p>Please log in to view your profile.</p>;
  }

  useEffect(() => {
    companyStore.fetchAllCompanies();
  }, [companyStore]);

  const handleOpenModalForCreate = () => {
    companyStore.currectCompany = null;
    modalStore.openAnyModal({ mode: 'create', activeModal: 'createEditCompany' });
  };

  const handleOpenModalForEdit = () => {
    modalStore.openAnyModal({ mode: 'edit', activeModal: 'createEditCompany' });
  };

  const openDeleteConfirmation = (company: Company | null) => {
    companyStore.setCompanyToDelete(company);
  };

  const handleConfirmDelete = () => {
    if (companyStore.companyToDelete !== null) {
      companyStore.deleteCompany(companyStore.companyToDelete);
      companyStore.setCompanyToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    companyStore.setCompanyToDelete(null);
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

  const handleCompanyClick = (company: Company) => {
    navigate(`/companies/${company._id}`);
  };

  const handleCompanySettingsClick = (company: Company) => {
    navigate(`/companies/${company._id}/settings`);
  };

  const handleClose = () => {
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
                companyStore.currectCompany = company;
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
      <div className="title-area">
        <HeaderTitle title="Company List" />
        <Button title="Create Company" onClick={handleOpenModalForCreate} />
      </div>

      {companyList}

      <Modal>
        {modalStore.activeModal === 'createEditCompany' && (
          <CreateCompanyForm
            company={companyStore.currectCompany}
            onSubmit={handleFormSubmit}
            handleClose={handleClose}
          />
        )}
      </Modal>
      {companyStore.companyToDelete !== null && (
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
