import { observer } from 'mobx-react-lite';
import UserProjectList from '../../../components/userManagement/user-project-list/UserProjectList';
import './projectsettings.css';

const ProjectSettings: React.FC = observer(() => {
  return (
    <div className="project-settings">
      <h1>Project settings</h1>
      <UserProjectList />
    </div>
  );
});

export default ProjectSettings;
