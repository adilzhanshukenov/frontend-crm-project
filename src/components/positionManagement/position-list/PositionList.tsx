import { observer } from 'mobx-react-lite';
import { useRouteParams } from '../../../utils/useRouteParams';
import Button from '../../shared/buttons/button/Button';
import PositionCard from '../position-card/PositionCard';
import { Position } from '../../../stores/positionStore/types';
import ConfirmationModal from '../../shared/confirmation-modal/ConfirmationModal';
import rootStore from '../../../stores/rootStore/RootStore';

const PositionList: React.FC = observer(() => {
  const { companyId } = useRouteParams();
  const { modalStore, positionStore } = rootStore;

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

  if (positionStore.error) return <p>Error: {positionStore.error}</p>;

  return (
    <div>
      <div className="title-area">
        <h2>Positions</h2>
        <Button title="Add position" onClick={openModalForCreate} />
      </div>
      {positionStore.positionList.length != 0 ? (
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
      ) : (
        <h2 style={{ textAlign: 'center' }}>No positions found</h2>
      )}

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
