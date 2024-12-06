import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import './deleteicon.css';
import { ButtonIconProps } from '../../interfaces/buttonIconInterface';

const DeleteIconButton = ({ title, onClick }: ButtonIconProps) => {
  return (
    <Tooltip title={title} arrow>
      <DeleteIcon
        className="delete-icon"
        onClick={onClick}
        sx={{
          transition: 'transform 0.3s ease', // Smooth transition
          '&:hover': {
            transform: 'scale(1.2)', // Scale on hover
          },
        }}
      />
    </Tooltip>
  );
};

export default DeleteIconButton;
