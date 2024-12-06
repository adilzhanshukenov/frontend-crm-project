import { Drawer } from '@mui/material';
import Logout from '../../authManagement/logout/Logout';
import CompanyIconButton from '../buttons/company-icon-button/CompanyIconButton';
import './iconsidebar.css';
import rootStore from '../../../stores/rootStore/RootStore';
import { observer } from 'mobx-react-lite';

const IconSidebar: React.FC = observer(() => {
  const { modalStore } = rootStore;

  const toggleDrawer = (newOpen: boolean) => () => {
    modalStore.setDrawerOpen(newOpen);
  };
  return (
    <Drawer
      open={modalStore.drawerOpen}
      onClose={toggleDrawer(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: 50, // Set drawer width
          backgroundColor: '#f4f4f4', // Set background color
          color: '#333', // Set text color
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '20px',
          paddingBottom: '20px',
        },
      }}
    >
      <CompanyIconButton />
      <Logout />
    </Drawer>
  );
});

export default IconSidebar;
