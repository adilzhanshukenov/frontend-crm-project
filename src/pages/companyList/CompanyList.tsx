import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { companyStore } from '../../stores/companyStore/CompanyStore';
import Modal from '../../components/shared/modal/Modal';
import CompanyCard from '../../components/companyManagement/company-card/CompanyCard';
import { CreateCompanyForm } from '../../components/companyManagement/create-company-form/CreateCompanyForm';
import { modalStore } from '../../stores/modalStore/ModalStore';
import './companylist.css';
import HeaderTitle from '../../components/shared/header-title/HeaderTitle';

const CompanyList: React.FC = observer(() => {
  const handleOpenModal = () => {
    modalStore.openModal();
  };

  useEffect(() => {
    companyStore.fetchAllCompanies();
  }, []);

  const navigate = useNavigate();

  const handleCompanyClick = (companyId: string | undefined) => {
    navigate(`${companyId}/projects`);
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
          <li key={company._id} onClick={() => handleCompanyClick(company._id)}>
            <CompanyCard company={company} />
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <div className="company-title-area">
        <HeaderTitle title="Company List" />
        <button onClick={handleOpenModal}>Create New Company</button>
      </div>

      <Modal title="Create Company">
        <CreateCompanyForm handleClose={handleCompanyCreated} />
      </Modal>
      {companyList}
    </div>
  );
});

export default CompanyList;
