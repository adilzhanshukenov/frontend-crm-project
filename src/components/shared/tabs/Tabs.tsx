import { observer } from 'mobx-react-lite';
import { TabProps } from './types';
import rootStore from '../../../stores/rootStore/RootStore';
import Overview from '../../projectManagement/overview/Overview';
import TaskList from '../../taskManagement/task-list/TaskList';
import './tabs.css';

const Tab = ({ label, isActive, onClick }: TabProps) => {
  return (
    <button className={`tab-button ${isActive ? 'active' : ''}`} onClick={onClick}>
      {label}
    </button>
  );
};

const Tabs: React.FC = observer(() => {
  const { tabStore } = rootStore;
  const tabData = [
    { label: 'Overview', component: <Overview /> },
    { label: 'Tasks', component: <TaskList /> },
  ];
  return (
    <div>
      <div className="tab-buttons">
        {tabData.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            isActive={index === tabStore.activeTab}
            onClick={() => tabStore.setActiveTab(index)}
          />
        ))}
      </div>

      <div className="tab-content">{tabData[tabStore.activeTab].component}</div>
    </div>
  );
});

export default Tabs;
