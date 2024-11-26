import { observer } from 'mobx-react-lite';
import './projectsettings.css';
import StageProjectList from '../../../components/projectManagement/stage-project-list/StageProjectList';
import ProjectUserList from '../../../components/projectManagement/project-user-list/ProjectUserList';

const ProjectSettings: React.FC = observer(() => {
  return (
    <div className="project-settings">
      <h1>Project settings</h1>
      <ProjectUserList />
      <StageProjectList />
    </div>
  );
});

export default ProjectSettings;
