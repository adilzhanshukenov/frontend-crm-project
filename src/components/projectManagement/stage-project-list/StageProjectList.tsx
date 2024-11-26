import { useEffect } from 'react';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import Button from '../../shared/button/Button';
import { useRouteParams } from '../../../utils/useRouteParams';
import StageCard from '../../stageManagement/stage-card/StageCard';
import { observer } from 'mobx-react-lite';
import ConfirmationModal from '../../shared/confirmation-modal/ConfirmationModal';
import { projectStore } from '../../../stores/projectStore/ProjectStore';
import { Stage } from '../../../stores/companyStore/types';

const StageProjectList: React.FC = observer(() => {
  const { projectId } = useRouteParams();

  useEffect(() => {
    projectStore.fetchStagesOfProject(projectId);
  }, [projectId]);

  const handleEdit = () => {};

  const openDeleteConfirmation = (stage: Stage | null) => {
    console.log(stage?._id);
    projectStore.setStageToDelete(stage);
  };

  const handleConfirmDelete = async () => {
    if (projectStore.stageToDelete !== null) {
      await projectStore.deleteStageFromProject(projectStore.stageToDelete?._id, projectId);
      projectStore.setStageToDelete(null);
      projectStore.fetchStagesOfProject(projectId);
    }
  };

  const handleCancelDelete = async () => {
    projectStore.setStageToDelete(null);
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
      <ul className="list-style">
        {projectStore.projectStage.map((projectStage) => (
          <li key={projectStage._id}>
            <StageCard
              stage={projectStage.stage}
              onEdit={handleEdit}
              onDelete={() => openDeleteConfirmation(projectStage.stage)}
            />
          </li>
        ))}
      </ul>

      {projectStore.stageToDelete !== null && (
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
