import { observer } from 'mobx-react-lite';
import './proejctbar.css';
import Button from '../../shared/button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import rootStore from '../../../stores/rootStore/RootStore';

const ProjectBar = observer(() => {
  const { projectStore } = rootStore;
  const { companyId } = useParams<{ companyId: string }>();
  const { projectId } = useParams<{ projectId: string }>();

  const navigate = useNavigate();

  const handleProjectSettingsClick = () => {
    navigate(`/companies/${companyId}/project/${projectId}/settings`);
  };

  return (
    <div className="project-bar">
      <div className="left-side">{projectStore.selectedProject?.name}</div>
      <div className="right-side">
        <Button title="Project settings" onClick={handleProjectSettingsClick} />
      </div>
    </div>
  );
});

export default ProjectBar;
