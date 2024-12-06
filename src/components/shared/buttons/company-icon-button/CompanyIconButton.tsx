import GroupsIcon from '@mui/icons-material/Groups';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CompanyIconButton: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    navigate(`/companies`);
  };
  return (
    <Tooltip title="Company list">
      <GroupsIcon style={{ cursor: 'pointer' }} onClick={handleClick} />
    </Tooltip>
  );
};

export default CompanyIconButton;
