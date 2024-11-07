import { useEffect } from 'react';
import AssignUserToCompanyForm from '../../components/companyManagement/assign-user-company-form/AssignUserToCompanyForm';
import Button from '../../components/shared/button/Button';
import Modal from '../../components/shared/modal/Modal';
import { modalStore } from '../../stores/modalStore/ModalStore';
import { userStore } from '../../stores/userStore/UserStore';
import { useParams } from 'react-router-dom';
import './companysettings.css';
import { observer } from 'mobx-react-lite';
import AddPositionCompanyForm from '../../components/positionManagement/add-position-company/AddPositionCompanyForm';
import PositionCard from '../../components/positionManagement/position-card/PositionCard';
import AddStageCompanyForm from '../../components/stageManagement/add-stage-company/AddStageCompanyForm';
import StageCard from '../../components/stageManagement/stage-card/StageCard';
import { positionStore } from '../../stores/positionStore/PositionStore';
import { stageStore } from '../../stores/stageStore/StageStore';
const CompanySettings = observer(() => {
  const { companyId } = useParams<{ companyId: string }>();

  useEffect(() => {
    userStore.fetchAllUsersOfCompany(companyId);
    positionStore.fetchAllPositions(companyId);
    stageStore.fetchAllStages(companyId);
  }, [companyId]);

  const userList = (
    <div>
      <ul>
        {userStore.userCompany.map((user) => (
          <li key={user.user._id}>{user.user.username}</li>
        ))}
      </ul>
    </div>
  );

  const handleOpenModalForCreatePosition = () => {
    positionStore.currentPosition = null;
    modalStore.openAnyModal({ mode: 'create', activeModal: 'createEditPosition' });
  };

  const handleOpenModalForEditPosition = () => {
    modalStore.openAnyModal({ mode: 'edit', activeModal: 'createEditPosition' });
  };

  const handleOpenModalForCreateStage = () => {
    positionStore.currentPosition = null;
    modalStore.openAnyModal({ mode: 'create', activeModal: 'createEditStage' });
  };

  const handleOpenModalForEditStage = () => {
    modalStore.openAnyModal({ mode: 'edit', activeModal: 'createEditStage' });
  };

  const positionList = (
    <div>
      <ul className="list-style">
        {positionStore.positionList.map((position) => (
          <li key={position._id}>
            <PositionCard
              position={position}
              onEdit={() => {
                positionStore.currentPosition = position;
                handleOpenModalForEditPosition();
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  const stageList = (
    <div>
      <ul className="list-style">
        {stageStore.stageList.map((stage) => (
          <li key={stage._id}>
            <StageCard
              stage={stage}
              onEdit={() => {
                stageStore.currentStage = stage;
                handleOpenModalForEditStage();
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="company-settings">
      <h1> Settings </h1>
      <div className="title-button-area">
        <h2>Users of company</h2>
        <Button title="Assign user" onClick={() => modalStore.openModal('addUserToCompany')} />
      </div>

      {userList}

      <div className="title-button-area">
        <h2>Positions</h2>
        <Button title="Add position" onClick={handleOpenModalForCreatePosition} />
      </div>

      {positionList}

      <div className="title-button-area">
        <h2>Stages</h2>
        <Button title="Add stage" onClick={handleOpenModalForCreateStage} />
      </div>

      {stageList}

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
