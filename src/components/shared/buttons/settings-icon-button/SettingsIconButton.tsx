import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import './settingsicon.css';
import { ButtonIconProps } from '../../interfaces/buttonIconInterface';

const SettingsIconButton = ({ title, onClick }: ButtonIconProps) => {
  return (
    <Tooltip title={title} arrow>
      <SettingsIcon
        className="settings-icon"
        onClick={onClick}
        sx={{
          transition: 'transform 0.5s ease', // Smooth transition
          '&:hover': {
            transform: 'rotate(20deg) scale(1.2)', // Scale on hover
          },
        }}
      />
    </Tooltip>
  );
};

export default SettingsIconButton;
