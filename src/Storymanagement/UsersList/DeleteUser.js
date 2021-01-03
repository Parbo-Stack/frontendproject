import React, {useEffect, useState} from "react";
import UserService from '../../Services/User.service'

const DeleteUser = props => {
    const initialStoryState = {
        id: null,
        email: "",
        username: "",
        userId: "",
        roles: [{id: null, name: ""}],
        published: false
    };
    const [currentUser, setCurrentUser] = useState(initialStoryState);
    const [message, setMessage] = useState("");

    const getUser = id => {
        UserService.getById(id)
            .then(response => {
                setCurrentUser(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getUser(props.match.params.id);
    }, [props.match.params.id]);

    const deleteStory = () => {
        UserService.deleteById(currentUser.userId)
            .then(response => {
                console.log(response.data);
                props.history.push("/userslist");
                console.log(props)
            })
            .catch(e => {
                console.log(e);
            });
    }

        return (
            <div>
                {currentUser ? (
                    <div className="edit-form">
                        <h4>Delete User</h4>
                        <form>
                            <div className="form-group">
                                <label className="email">Email:</label>
                                <input type="text"
                                       id="email"
                                       required
                                       value={currentUser.email}
                                       disabled
                                />
                            </div>
                            <label className="username">User Name:</label>
                            <input
                                id="username"
                                required
                                value={currentUser.username}
                                disabled
                            />
                            <label className="userid">User Id:</label>
                            <input
                                id="userId"
                                required
                                value={currentUser.userId}
                                disabled
                            />
                                <label className="userid">Role:</label>
                                <input
                                    id="roles"
                                    required
                                    value={currentUser.roles[0].name}
                                    disabled
                                />
                        </form>
                        <br/>
                        {currentUser.published ? (
                            <button>
                            </button>
                        ) : (
                            <div/>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={deleteStory}>
                            Delete
                        </button>
                        <p>{message}</p>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a User...</p>
                    </div>
                )}
            </div>
        );
    }

    export default DeleteUser;