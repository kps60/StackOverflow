import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../actions/users";
import UserTable from "./components/UserTables";
import "./styles.css"
const UserManagement = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.usersReducer);
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    if (!users || !Array.isArray(users)) {
        return <div>Loading...</div>;
    }
    return (
        <div className="user-management">
            <h2>User Management</h2>
            {users.length !== 0 && <UserTable dt={users} />}
        </div>
    );
};
export default UserManagement