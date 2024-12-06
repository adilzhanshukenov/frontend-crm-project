import { Box, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './projectheader.css';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import { observer } from 'mobx-react-lite';

const ProjectHeader = observer(() => {
  return (
    <div className="project-header">
      <div className="search-bar">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" variant="standard" placeholder="search" />
        </Box>
      </div>
      <div className="profile-icons">
        <SettingsIcon
          fontSize="large"
          className="settings-icon"
          sx={{
            transition: 'transform 0.5s ease', // Smooth transition
            '&:hover': {
              transform: 'rotate(20deg) scale(1.2)', // Scale on hover
            },
          }}
        />
        <AccountCircleIcon
          fontSize="large"
          style={{ cursor: 'pointer' }}
          sx={{
            transition: 'transform 0.5s ease', // Smooth transition
            '&:hover': {
              transform: 'scale(1.2)', // Scale on hover
            },
          }}
        />
      </div>
    </div>
  );
});

export default ProjectHeader;
