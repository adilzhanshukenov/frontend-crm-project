import { observer } from 'mobx-react-lite';
import { TabProps } from './types';
import rootStore from '../../../stores/rootStore/RootStore';
import Overview from '../../projectManagement/overview/Overview';
import TaskList from '../../taskManagement/task-list/TaskList';
import './tabs.css';
import { Tab } from '@mui/material';

const TabComponent = ({ label, isActive, onClick }: TabProps) => {
  return <Tab label={label} className={`tab-button ${isActive ? 'active' : ''}`} onClick={onClick} />;
};

const TabsComponent: React.FC = observer(() => {
  const { tabStore } = rootStore;
  const tabData = [
    { label: 'Overview', component: <Overview /> },
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
