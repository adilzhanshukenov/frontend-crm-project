import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import './companylist.css';
import { CreateCompanyForm } from '../../../components/companyManagement/create-company-form/CreateCompanyForm';
import HeaderTitle from '../../../components/shared/header-title/HeaderTitle';
import CompanyCard from '../../../components/companyManagement/company-card/CompanyCard';
import Modal from '../../../components/shared/modal/Modal';
import { Company } from '../../../stores/companyStore/types';
import Button from '../../../components/shared/buttons/button/Button';
import ConfirmationModal from '../../../components/shared/confirmation-modal/ConfirmationModal';
import { useAuth } from '../../../context/useAuth';
import rootStore from '../../../stores/rootStore/RootStore';
import LinearProgress from '@mui/material/LinearProgress';

const CompanyList: React.FC = observer(() => {
  const { isAuthenticated } = useAuth();
  const { companyStore, projectStore, modalStore } = rootStore;
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

  if (companyStore.loading)
    return (
      <div style={{ width: '100%' }}>
        <LinearProgress />
      </div>
    );
  if (companyStore.error) return <p>Error: {companyStore.error}</p>;

  const handleCompanyClick = async (company: Company) => {
    await projectStore.fetchProjectsOfCompany(company._id);
    if (projectStore.projects.length > 0) projectStore.setSelectedProject(projectStore.projects[0]._id);
    navigate(`/companies/${company._id}/project/${projectStore.selectedProject?._id}`);
    modalStore.setDrawerOpen(false);
  };

  const handleCompanySettingsClick = (company: Company) => {
    navigate(`/companies/${company._id}/settings`);
  };

  const companyList = (
    <div className="company-card-list">
      {companyStore.companyList?.map((company) => (
        <CompanyCard
          key={company._id}
          onClick={() => handleCompanyClick(company)}
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
      ))}
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
          <CreateCompanyForm company={companyStore.currectCompany} onSubmit={handleFormSubmit} />
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
