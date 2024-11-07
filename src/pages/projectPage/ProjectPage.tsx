import { observer } from 'mobx-react-lite';
import ProjectHeader from '../../components/projectManagement/proejct-header/ProjectHeader';
import ProjectBar from '../../components/projectManagement/project-bar/ProjectBar';

const ProjectPage: React.FC = observer(() => {
  return (
    <div>
      <ProjectHeader />
      <ProjectBar />
    </div>
  );
});

export default ProjectPage;
