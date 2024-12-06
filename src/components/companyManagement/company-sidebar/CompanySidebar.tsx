import './companysidebar.css';
import ProjectList from '../../../pages/project/projectList/ProjectList';
import Button from '../../shared/buttons/button/Button';
import rootStore from '../../../stores/rootStore/RootStore';
import OpenDrawerButton from '../../shared/buttons/open-drawer-button/OpenDrawerButton';

const CompanySidebar = () => {
  const { modalStore } = rootStore;
  return (
    <div className="company-sidebar">
      <div style={{ width: '100%' }}>
        <OpenDrawerButton title="Open drawer" onClick={() => modalStore.setDrawerOpen(true)} />
        <ProjectList />
      </div>

      <div className="company-sidebar-bottom">
        <Button
          title="Add project"
          onClick={() => modalStore.openAnyModal({ mode: 'create', activeModal: 'createProjectModal' })}
        />
      </div>
    </div>
  );
};

export default CompanySidebar;
