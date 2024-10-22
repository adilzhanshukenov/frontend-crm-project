import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { userStore } from '../../stores/userStore/UserStore'

const UsersList = observer(() => {
    useEffect(() => {
        userStore.fetchAllUsers();
    } ,[]);

    const usersList = (
        <div>
            <ul>
                {userStore.users?.map(user => (
                <li >
                    {user.username} ({user.email})
                </li>
                ))}
            </ul>
         </div>
    )

    return (
        <div>
            <h1>List of Users</h1>
            {usersList}
        </div>
    )
})

export default UsersList;