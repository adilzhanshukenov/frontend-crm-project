import { observer } from 'mobx-react-lite';
import Button from '../../shared/buttons/button/Button';
import { useRouteParams } from '../../../utils/useRouteParams';
import StageCard from '../../stageManagement/stage-card/StageCard';
import ConfirmationModal from '../../shared/confirmation-modal/ConfirmationModal';
import { Stage } from '../../../stores/stageStore/types';
import rootStore from '../../../stores/rootStore/RootStore';

const StageProjectList: React.FC = observer(() => {
  const { projectId } = useRouteParams();
  const { stageStore, modalStore } = rootStore;

  const openEditModal = () => {
    modalStore.openAnyModal({ mode: 'edit', activeModal: 'addStageToProject' });
  };

  const openDeleteConfirmation = (stage: Stage | null) => {
    stageStore.setStageToDelete(stage);
  };

  const handleConfirmDelete = async () => {
    if (stageStore.stageToDelete !== null) {
      await stageStore.deleteStageFromProject(stageStore.stageToDelete?._id, projectId);
      stageStore.setStageToDelete(null);
      stageStore.fetchStagesOfProject(projectId);
    }
  };

  const handleCancelDelete = async () => {
    stageStore.setStageToDelete(null);
  };

  return (
    <div>
      <div className="title-area">
        <h2>Stages of project</h2>
        <Button
          title="Add stage"
          onClick={() => modalStore.openAnyModal({ mode: 'create', activeModal: 'addStageToProject' })}
        />
      </div>
      {stageStore.projectStage.length != 0 ? (
        <ul className="list-style">
          {stageStore.projectStage.map((projectStage) => (
            <li key={projectStage._id}>
              <StageCard
                stage={projectStage.stage}
                projectStage={projectStage}
                onEdit={openEditModal}
                onDelete={() => openDeleteConfirmation(projectStage.stage)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <h2 style={{ textAlign: 'center' }}>No stages found</h2>
      )}

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

export default StageProjectList;
