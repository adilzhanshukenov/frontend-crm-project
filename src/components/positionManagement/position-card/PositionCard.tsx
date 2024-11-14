import { FormEvent } from 'react';
import Button from '../../shared/button/Button';
import { Position } from '../../../stores/positionStore/types';
import './positioncard.css';

interface PositionCardProps {
  position: Position;
  onEdit: () => void;
  onDelete: () => void;
}

const PositionCard: React.FC<PositionCardProps> = ({ position, onEdit, onDelete }) => {
  return (
    <div className="position-card">
      <div>
        <h3>{position.name}</h3>
        <p>{position.description}</p>
      </div>
      <div className="card-buttons">
        <Button
          title="Edit"
          onClick={(e: FormEvent) => {
            e.stopPropagation();
            onEdit();
          }}
        />
        <Button
          title="Delete"
          onClick={(e: FormEvent) => {
            e.preventDefault();
            onDelete();
          }}
        />
      </div>
    </div>
  );
};

export default PositionCard;
