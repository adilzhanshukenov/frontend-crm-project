import { useEffect } from 'react';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import { userStore } from '../../../stores/userStore/UserStore';
import Button from '../../shared/button/Button';
import { useRouteParams } from '../../../utils/useRouteParams';
import { observer } from 'mobx-react-lite';

const UserCompanyList: React.FC = observer(() => {
  const { companyId } = useRouteParams();

  useEffect(() => {
    userStore.fetchAllUsersOfCompany(companyId);
  }, [companyId]);
  return (
    <div>
      <div className="title-area">
        <h2>Users of company</h2>
        <Button
          title="Assign user"
          onClick={() => modalStore.openAnyModal({ mode: 'create', activeModal: 'addUserToCompany' })}
        />
      </div>
      <div>
        <ul>
          {userStore.userCompany.map((user) => (
            <li key={user.user._id}>{user.user.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default UserCompanyList;
