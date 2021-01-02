import React, {useEffect, useState} from "react";
import UserService from "../../Services/User.service";
import {Link} from "react-router-dom";
import '../../Styles/BoardAdmin.css';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        retrieveUsers();
    }, []);

    const retrieveUsers = () => {
        UserService.getAllUsers()
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveUsers();
        setCurrentUser(null);
        setCurrentIndex(-1);
    };

    const setActiveUser = (user, index) => {
        setCurrentUser(user);
        setCurrentIndex(index);
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Users List</h4>

                <ul className="list-group">
                    {users &&
                    users.map((user, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveUser(user, index)}
                            key={index}
                        >
                            {user.username}
                        </li>
                    ))}
                </ul>

            </div>
            <div className="col-md-6">
                {currentUser ? (
                    <div>
                        <h4>Users</h4>
                        <div>
                            <label>
                                <strong>Email:</strong>
                            </label>{" "}
                            {currentUser.email}
                        </div>
                        <div>
                            <label>
                                <strong>Username:</strong>
                            </label>{" "}
                            {currentUser.username}
                        </div>
                        <div>
                            <label>
                                <strong>UserId:</strong>
                            </label>{" "}
                            {currentUser.userId}
                        </div>
                        <Link//de id is undefined omdat het de id niet herkent als id maar als b.v storyId
                            to={"/deleteuser/" + currentUser.userId}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a User...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersList;