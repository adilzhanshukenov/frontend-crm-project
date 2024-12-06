import { useRouteParams } from '../../../utils/useRouteParams';
import Button from '../../shared/buttons/button/Button';
import ConfirmationModal from '../../shared/confirmation-modal/ConfirmationModal';
import StageCard from '../stage-card/StageCard';
import { observer } from 'mobx-react-lite';
import { Stage } from '../../../stores/stageStore/types';
import rootStore from '../../../stores/rootStore/RootStore';

const StageList: React.FC = observer(() => {
  const { companyId } = useRouteParams();
  const { stageStore, modalStore } = rootStore;

  const openDeleteConfirmation = (stage: Stage | null) => {
    stageStore.setStageToDelete(stage);
  };

  const handleConfirmDelete = async () => {
    if (stageStore.stageToDelete !== null) {
      await stageStore.deleteStage(stageStore.stageToDelete?._id);
      stageStore.setStageToDelete(null);
      stageStore.fetchAllStages(companyId);
    }
  };

  const handleCancelDelete = async () => {
    stageStore.setStageToDelete(null);
  };

  const openModalForCreate = () => {
    stageStore.currentStage = null;
    modalStore.openAnyModal({ mode: 'create', activeModal: 'createEditStage' });
  };

  const openModalForEdit = () => {
    modalStore.openAnyModal({ mode: 'edit', activeModal: 'createEditStage' });
  };

  if (stageStore.error) return <p>Error: {stageStore.error}</p>;

  return (
    <div>
      <div className="title-area">
        <h2>Stages</h2>
        <Button title="Add stage" onClick={openModalForCreate} />
      </div>
      <div>
        <ul className="list-style">
          {stageStore.stageList?.map((stage) => (
            <li key={stage._id}>
              <StageCard
                stage={stage}
                onEdit={() => {
                  stageStore.currentStage = stage;
                  openModalForEdit();
                }}
                onDelete={() => openDeleteConfirmation(stage)}
              />
            </li>
          ))}
        </ul>
      </div>
      {stageStore.stageToDelete !== null && (
        <ConfirmationModal
          message="Are you sure you want to delete this stage?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
});

export default StageList;
