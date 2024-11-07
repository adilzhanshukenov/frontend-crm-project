import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import { userStore } from '../../../stores/userStore/UserStore';
import Button from '../../shared/button/Button';
import { UserCompany } from '../../../stores/userStore/types';
import './assignusertocompany.css';
import { positionStore } from '../../../stores/positionStore/PositionStore';

const AssignUserToCompanyForm: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [user, setUser] = useState<string>('');
  const [position, setPosition] = useState<string>('');

  useEffect(() => {
    // userStore.fetchAllUsers();
    positionStore.fetchAllPositions(companyId);
  }, [companyId]);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPosition(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: UserCompany = {
      company: companyId || '', // Use companyId from URL
      user: user,
      position: position,
    };

    await userStore.checkUserExists(user);
    console.log(userStore.userExists);
    if (userStore.userExists) {
      await userStore.findUserByName(user);
      console.log(userStore.selectedUser);
      const formData2 = { ...formData, user: userStore.selectedUser };
      await userStore.assignUserToCompany(formData2);
    } else {
      console.log('User already exists');
    }
    userStore.fetchAllUsersOfCompany(companyId);
    modalStore.closeModal();
  };

  const positionList = positionStore.positionList.map((position) => (
    <option key={position._id} value={position._id}>
      {position.name}
    </option>
  ));

  //   const options = userStore.users.map((user) => (
  //     <option key={user._id} value={user._id}>
  //       {user.username}
  //     </option>
  //   ));

  return (
    <form className="user-company-form" onSubmit={handleFormSubmit}>
      <h2>Assign User</h2>
      <div className="company-form-inputs">
        <label htmlFor="userCompanyInput">User:</label>
        <input
          type="text"
          id="userCompanyInput"
          value={user}
          onChange={handleUserChange}
          placeholder="Enter username"
        />
      </div>

      <div className="company-form-inputs">
        <label>Position:</label>
        <select value={position} onChange={handlePositionChange}>
          <option>Select position</option>
          {positionList}
        </select>
        {/* <input type="text" value={position} onChange={handleRoleChange} placeholder="Enter role" /> */}
      </div>
      <button type="submit">Assign</button>
      <Button title="Cancel" onClick={() => modalStore.closeModal()} />
    </form>
  );
};

export default AssignUserToCompanyForm;
