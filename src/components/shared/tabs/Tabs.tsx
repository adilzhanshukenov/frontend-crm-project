import { observer } from 'mobx-react-lite';
import { TabProps } from './types';
import rootStore from '../../../stores/rootStore/RootStore';
import TaskList from '../../taskManagement/task-list/TaskList';
import './tabs.css';
import { Tab } from '@mui/material';
import ProjectOverview from '../../../pages/project/project-overview/ProjectOverview';

const TabComponent = ({ label, isActive, onClick }: TabProps) => {
  return (
    <Tab
      sx={{
        transition: 'transform 0.3s ease, background-color 0.5s ease', // Smooth transition
        '&:hover': {
          backgroundColor: 'lightblue', // Scale on hover
        },
      }}
      label={label}
      className={`tab-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    />
  );
};

const TabsComponent: React.FC = observer(() => {
  const { tabStore } = rootStore;
  const tabData = [
    { label: 'Overview', component: <ProjectOverview /> },
    { label: 'Tasks', component: <TaskList /> },
  ];
  return (
    <div>
      {tabData.map((tab, index) => (
        <TabComponent
          key={index}
          label={tab.label}
          isActive={index === tabStore.activeTab}
          onClick={() => tabStore.setActiveTab(index)}
        />
      ))}

      <div className="tab-content">{tabData[tabStore.activeTab].component}</div>
    </div>
  );
});

export default TabsComponent;
