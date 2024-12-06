import { observer } from 'mobx-react-lite';
import './projectsettings.css';
import StageProjectList from '../../../components/projectManagement/stage-project-list/StageProjectList';
import ProjectUserList from '../../../components/projectManagement/project-user-list/ProjectUserList';
import { useEffect } from 'react';
import rootStore from '../../../stores/rootStore/RootStore';
import { useRouteParams } from '../../../utils/useRouteParams';
import { LinearProgress } from '@mui/material';

const ProjectSettings: React.FC = observer(() => {
  const { projectStore, stageStore } = rootStore;
  const { projectId } = useRouteParams();
  useEffect(() => {
    projectStore.fetchUsersOfProject(projectId);
    stageStore.fetchStagesOfProject(projectId);
  }, [projectStore, projectId, stageStore]);

  if (projectStore.loading || stageStore.loading)
    return (
      <div style={{ width: '100%' }}>
        <LinearProgress />
      </div>
    );

  return (
    <div className="project-settings">
      <h1>Project settings</h1>
      <ProjectUserList />
      <StageProjectList />
    </div>
  );
});

export default ProjectSettings;
