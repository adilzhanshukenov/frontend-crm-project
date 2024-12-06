import { observer } from 'mobx-react-lite';
import AssignUserToCompanyForm from '../../../components/companyManagement/assign-user-company-form/AssignUserToCompanyForm';
import Modal from '../../../components/shared/modal/Modal';
import AddPositionCompanyForm from '../../../components/positionManagement/add-position-company/AddPositionCompanyForm';
import StageList from '../../../components/stageManagement/stage-list/StageList';
import PositionList from '../../../components/positionManagement/position-list/PositionList';
import './companysettings.css';
import AddStageCompanyForm from '../../../components/companyManagement/add-stage-company-form/AddStageCompanyForm';
import rootStore from '../../../stores/rootStore/RootStore';
import CompanyUserList from '../../../components/companyManagement/company-user-list/CompanyUserList';
import { useEffect } from 'react';
import { useRouteParams } from '../../../utils/useRouteParams';
import { LinearProgress } from '@mui/material';

const CompanySettings = observer(() => {
  const { companyId } = useRouteParams();
  const { modalStore, stageStore, positionStore, companyStore } = rootStore;

  useEffect(() => {
    companyStore.fetchAllUsersOfCompany(companyId);
    positionStore.fetchAllPositions(companyId);
    stageStore.fetchAllStages(companyId);
  }, [companyId, companyStore, positionStore, stageStore]);

  if (companyStore.loading || positionStore.loading || stageStore.loading)
    return (
      <div style={{ width: '100%' }}>
        <LinearProgress />
      </div>
    );

  return (
    <div className="company-settings">
      <h1> Settings </h1>

      <CompanyUserList />
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
