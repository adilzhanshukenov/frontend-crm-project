import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { ButtonIconProps } from '../../interfaces/buttonIconInterface';
import './editicon.css';

const EditIconButton = ({ title, onClick }: ButtonIconProps) => {
  return (
    <Tooltip title={title} arrow>
      <EditIcon
        className="edit-icon"
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

export default EditIconButton;
