import React, {useState, useEffect, useRef} from "react";
import UserService from "../services/user.service";
import ReadStory from "../pages/readstory";
import ReadStoryPost from "../pages/readstory/readstorypost";
import AuthService from "../services/auth.service";

const BoardAdmin = () => {
    const [role, setRole] = useState("");
    const checkBtn = useRef();

    useEffect(() => {
         AuthService.login (this.state.username && this.state.password === true)
            .then((response)=> {
            setRole(response.data.user[0].username);
            console.log(response.data.user[0].username)
        });
    }, []);

    return (
        <div>
            {role === "user" && <ReadStory/>}
            {role === "user" && <ReadStoryPost/>}
        </div>
    )
}

export default BoardAdmin;