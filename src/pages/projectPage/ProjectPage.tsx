import { observer } from 'mobx-react-lite';
import { projectStore } from '../../stores/projectStore/ProjectStore';
import { Project } from '../../stores/projectStore/types';

const ProjectPage: React.FC = observer(() => {
  const project: Project | null = projectStore.selectedProject;

  return (
    <div>
      <p>{project?.name}</p>
      HELLo
    </div>
  );
});

export default ProjectPage;
