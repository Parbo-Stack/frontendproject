import React, {useEffect, useState} from "react";
import UserService from '../Services/User.service'

const EditUser = props => {
    const initialStoryState = {
        id: null,
        email: "",
        username: "",
        userId: "",
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


    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentUser({...currentUser, [name]: value});
    };

    const updatePublished = status => {
        const data = {
            id: currentUser.id,
            email: currentUser.email,
            username: currentUser.username,
            userId: currentUser.userId,
            published: status
        };
//de id is undefined omdat het de id niet herkent als id maar als b.v storyId
        UserService.updateUser(currentUser.userId, data)
            .then(response => {
                setCurrentUser({...currentUser, published: status})
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateStory = () => {
        UserService.updateUser(currentUser.userId, currentUser)
            .then(response => {
                console.log(response.data);
                setMessage("The user was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            })
    };

    const deleteStory = () => {
        UserService.deleteById(currentUser.userId)
            .then(response => {
                console.log(response.data);
                props.history.push("/admin");
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
                    </form>
                    <br/>
                    {currentUser.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(false)}
                        >
                            UnPublish
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
                    <p>Please click on a Story...</p>
                </div>
            )}
        </div>
    );
}

export default EditUser;