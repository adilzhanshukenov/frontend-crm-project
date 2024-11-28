import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Project } from '../../../stores/projectStore/types';
import rootStore from '../../../stores/rootStore/RootStore';

const ProjectList: React.FC = observer(() => {
  const { projectStore } = rootStore;
  const { companyId } = useParams<{ companyId: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    if (companyId) {
      projectStore.fetchProjectsOfCompany(companyId);
    }
  }, [companyId, projectStore]);

  if (projectStore.loading) {
    return <div>Loading projects...</div>;
  }

  if (projectStore.error) {
    return <div>Error: {projectStore.error}</div>;
  }

  const handleProjectClick = (project: Project) => {
    navigate(`project/${project._id}`);
    projectStore.setSelectedProject(project._id);
  };

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projectStore.projects.map((project) => (
          <li key={project._id} onClick={() => handleProjectClick(project)}>
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ProjectList;
