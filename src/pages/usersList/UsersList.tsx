import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { userStore } from '../../stores/userStore/UserStore'

const UsersList = observer(() => {
    useEffect(() => {
        userStore.fetchAllUsers();
    } ,[]);

    const usersList = (
            <ul>
                {userStore.users?.map(user => (
                <li key={user._id}>
                    {user.username} ({user.email})
                </li>
                ))}
            </ul>
    )

    return (
        <div>
            {usersList}
        </div>
    )
})

export default UsersList;