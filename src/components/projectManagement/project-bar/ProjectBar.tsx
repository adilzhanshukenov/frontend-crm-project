import { observer } from 'mobx-react-lite';
import './proejctbar.css';
import { projectStore } from '../../../stores/projectStore/ProjectStore';
import Button from '../../shared/button/Button';
import { modalStore } from '../../../stores/modalStore/ModalStore';

const ProjectBar = observer(() => {
  const handleClick = () => {
    modalStore.openModal('addUserToProject');
  };
  return (
    <div className="project-bar">
      <div className="left-side">{projectStore.selectedProject?.name}</div>
      <div className="right-side">
        <Button title="Add user" onClick={handleClick} />
      </div>
    </div>
  );
});

export default ProjectBar;
