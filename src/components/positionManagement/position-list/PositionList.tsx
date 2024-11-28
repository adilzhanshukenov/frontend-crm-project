import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouteParams } from '../../../utils/useRouteParams';
import Button from '../../shared/button/Button';
import PositionCard from '../position-card/PositionCard';
import { Position } from '../../../stores/positionStore/types';
import ConfirmationModal from '../../shared/confirmation-modal/ConfirmationModal';
import rootStore from '../../../stores/rootStore/RootStore';

const PositionList: React.FC = observer(() => {
  const { companyId } = useRouteParams();
  const { modalStore, positionStore } = rootStore;

  useEffect(() => {
    positionStore.fetchAllPositions(companyId);
  }, [companyId, positionStore]);

  const openDeleteConfirmation = async (position: Position | null) => {
    positionStore.setPositionToDelete(position);
  };

  const handleConfirmDelete = async () => {
    if (positionStore.positionToDelete !== null) {
      await positionStore.deletePosition(positionStore.positionToDelete?._id);
      positionStore.setPositionToDelete(null);
      positionStore.fetchAllPositions(companyId);
    }
  };

  const handleCancelDelete = async () => {
    positionStore.setPositionToDelete(null);
  };

  /**
   * Open modal for create position
   */
  const openModalForCreate = () => {
    positionStore.currentPosition = null;
    modalStore.openAnyModal({ mode: 'create', activeModal: 'createEditPosition' });
  };

  /**
   * Open modal for edit position
   */
  const openModalForEdit = () => {
    modalStore.openAnyModal({ mode: 'edit', activeModal: 'createEditPosition' });
  };

  if (positionStore.loading) return <p>Loading...</p>;
  if (positionStore.error) return <p>Error: {positionStore.error}</p>;

  return (
    <div>
      <div className="title-area">
        <h2>Positions</h2>
        <Button title="Add position" onClick={openModalForCreate} />
      </div>
      <div>
        <ul className="list-style">
          {positionStore.positionList?.map((position) => (
            <li key={position._id}>
              <PositionCard
                position={position}
                onEdit={() => {
                  positionStore.currentPosition = position;
                  openModalForEdit();
                }}
                onDelete={() => openDeleteConfirmation(position)}
              />
            </li>
          ))}
        </ul>
      </div>
      {positionStore.positionToDelete !== null && (
        <ConfirmationModal
          message="Are you sure you want to delete this position?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
});

export default PositionList;
