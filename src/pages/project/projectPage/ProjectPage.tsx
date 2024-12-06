import { observer } from 'mobx-react-lite';
import ProjectHeader from '../../../components/projectManagement/project-header/ProjectHeader';
import ProjectBar from '../../../components/projectManagement/project-bar/ProjectBar';
import TabsComponent from '../../../components/shared/tabs/Tabs';

const ProjectPage: React.FC = observer(() => {
  return (
    <div>
      <ProjectHeader />
      <ProjectBar />
      <TabsComponent />
    </div>
  );
});

export default ProjectPage;
