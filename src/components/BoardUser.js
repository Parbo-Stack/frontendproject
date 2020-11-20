import React, {useState, useEffect} from "react";
import UserService from '../services/user.service'
import ReadStory from "../pages/readstory";
import ReadStoryPost from "../pages/readstory/readstorypost";

export default function BoardUser() {
    const [role, setRole] = useState("");

    useEffect(() => {
        UserService.getUserBoard().then(
            (response) => {
                setRole(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setRole(role);
            }
        );
    }, []);

    return (
        <div className="container">

        </div>
    );
};

