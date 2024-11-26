import { observer } from 'mobx-react-lite';
import ProjectHeader from '../../../components/projectManagement/project-header/ProjectHeader';
import ProjectBar from '../../../components/projectManagement/project-bar/ProjectBar';
import Tabs from '../../../components/shared/tabs/Tabs';

const ProjectPage: React.FC = observer(() => {
  return (
    <div>
      <ProjectHeader />
      <ProjectBar />
      <Tabs />
    </div>
  );
});

export default ProjectPage;
