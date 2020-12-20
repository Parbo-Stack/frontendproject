import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./Services/Auth.service";
import PageRouting from "./Routes/Routes";

function App() {
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [showUserBoard, setShowUserBoard] = useState(false);


    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowUserBoard(user.roles.includes("ROLE_USER"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };


    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    Owie
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                    </li>
                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/addstory"} className="nav-link">
                                Add Story
                            </Link>
                        </li>
                    )}
                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/storieslist"} className="nav-link">
                                Stories List
                            </Link>
                        </li>
                    )}
                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link">
                                Admin Board
                            </Link>
                        </li>
                    )}
                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/usersstory"} className="nav-link">
                                Users Story
                            </Link>
                        </li>
                    )}
                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/partslist"} className="nav-link">
                                StoryPart List
                            </Link>
                        </li>
                    )}
                    {showUserBoard && (
                        <li className="nav-item">
                            <Link to={"/readstory"} className="nav-link">
                                Read Story
                            </Link>
                        </li>
                    )}
                    {showUserBoard && (
                        <li className="nav-item">
                            <Link to={"/writestory"} className="nav-link">
                                Write Story
                            </Link>
                        </li>
                    )}
                    {showUserBoard && (
                        <li className="nav-item">
                            <Link to={"/finishstory"} className="nav-link">
                                Finish Story
                            </Link>
                        </li>
                    )}

                </div>
                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
            </nav>
            <PageRouting/>
        </div>

    );
}


export default App;