import { useEffect } from 'react';
import './projectoverview.css';
import rootStore from '../../../stores/rootStore/RootStore';
import { observer } from 'mobx-react-lite';

const ProjectOverview: React.FC = observer(() => {
  const { projectStore } = rootStore;
  useEffect(() => {
    projectStore.loadSelectedProject();
  }, [projectStore]);

  const project = projectStore?.selectedProject;

  return (
    <div>
      <h1>{project?.name}</h1>
      <h2>Description: {project?.description}</h2>
    </div>
  );
});

export default ProjectOverview;
