import { useEffect } from 'react';
import { useRouteParams } from '../../../utils/useRouteParams';
import Button from '../../shared/button/Button';
import ConfirmationModal from '../../shared/confirmation-modal/ConfirmationModal';
import StageCard from '../stage-card/StageCard';
import { observer } from 'mobx-react-lite';
import { companyStore } from '../../../stores/companyStore/CompanyStore';
import { Stage } from '../../../stores/companyStore/types';

const StageList: React.FC = observer(() => {
  const { companyId } = useRouteParams();

  useEffect(() => {
    companyStore.fetchAllStages(companyId);
  }, [companyId]);

  const openDeleteConfirmation = (stage: Stage | null) => {
    companyStore.setStageToDelete(stage);
  };

  const handleConfirmDelete = async () => {
    if (companyStore.stageToDelete !== null) {
      await companyStore.deleteStage(companyStore.stageToDelete?._id);
      companyStore.setStageToDelete(null);
      companyStore.fetchAllStages(companyId);
    }
  };

  const handleCancelDelete = async () => {
    companyStore.setStageToDelete(null);
  };

  if (companyStore.loading) return <p>Loading...</p>;
  if (companyStore.error) return <p>Error: {companyStore.error}</p>;

  return (
    <div>
      <div className="title-area">
        <h2>Stages</h2>
        <Button title="Add stage" onClick={companyStore.openModalForCreate} />
      </div>
      <div>
        <ul className="list-style">
          {companyStore.stageList?.map((stage) => (
            <li key={stage._id}>
              <StageCard
                stage={stage}
                onEdit={() => {
                  companyStore.currentStage = stage;
                  companyStore.openModalForEdit();
                }}
                onDelete={() => openDeleteConfirmation(stage)}
              />
            </li>
          ))}
        </ul>
      </div>
      {companyStore.stageToDelete !== null && (
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
