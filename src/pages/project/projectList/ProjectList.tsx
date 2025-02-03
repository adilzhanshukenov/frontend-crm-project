import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Project } from '../../../stores/projectStore/types';
import rootStore from '../../../stores/rootStore/RootStore';
import './projectList.css';

const ProjectList: React.FC = observer(() => {
  const { projectStore } = rootStore;
  const { companyId } = useParams<{ companyId: string }>();

  useEffect(() => {
    if (companyId) {
      projectStore.fetchProjectsOfCompany(companyId);
    }
  }, [companyId, projectStore]);

  if (projectStore.error) {
    return <div>Error: {projectStore.error}</div>;
  }

  const handleProjectClick = (project: Project) => {
    projectStore.setSelectedProject(project._id);
  };

  return (
    <div className="project-list">
      <h2>Projects</h2>
      <div className="project-list-items">
        {projectStore.projects.map((project) => (
          <NavLink
            onClick={() => handleProjectClick(project)}
            key={project._id}
            className={({ isActive }) => (isActive ? 'project-item active' : 'project-item')}
            to={`project/${project._id}`}
          >
            {project.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
});

export default ProjectList;
