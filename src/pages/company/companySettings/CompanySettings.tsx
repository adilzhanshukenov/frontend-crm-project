import { observer } from 'mobx-react-lite';
import AssignUserToCompanyForm from '../../../components/companyManagement/assign-user-company-form/AssignUserToCompanyForm';
import Modal from '../../../components/shared/modal/Modal';
import AddPositionCompanyForm from '../../../components/positionManagement/add-position-company/AddPositionCompanyForm';
import StageList from '../../../components/stageManagement/stage-list/StageList';
import PositionList from '../../../components/positionManagement/position-list/PositionList';
import UserCompanyList from '../../../components/companyManagement/company-user-list/CompanyUserList';
import './companysettings.css';
import AddStageCompanyForm from '../../../components/companyManagement/add-stage-company-form/AddStageCompanyForm';
import rootStore from '../../../stores/rootStore/RootStore';

const CompanySettings = observer(() => {
  const { modalStore, stageStore, positionStore } = rootStore;
  return (
    <div className="company-settings">
      <h1> Settings </h1>

      <UserCompanyList />
      <PositionList />
      <StageList />

      <Modal>
        {modalStore.activeModal === 'addUserToCompany' && <AssignUserToCompanyForm />}
        {modalStore.activeModal === 'createEditStage' && <AddStageCompanyForm stage={stageStore.currentStage} />}
        {modalStore.activeModal === 'createEditPosition' && (
          <AddPositionCompanyForm position={positionStore.currentPosition} />
        )}
      </Modal>
    </div>
  );
});

export default CompanySettings;
