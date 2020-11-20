import React, {useState, useEffect} from "react";
import {Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/home/Home";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import StoriesList from "./storymanagement/storylist";
import ReadStory from "./pages/readstory";
import ReadStoryPost from "./pages/readstory/readstorypost";
import EditStory from "./storymanagement/editstory";
import AddStory from "./storymanagement/addstory";
// import FinishStory from "./pages/finishstory";
// import FinishStoryPost from "./pages/finishstory/finishstorypost";

function App () {
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
            Welcome :)
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

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />
            <Route exact path="/addstory" component={AddStory}/>
            <Route exact path="/editstory/:id" component={EditStory}/>
            <Route exact path="/storieslist" component={StoriesList}/>
            <Route exact path="/readstory" component={ReadStory}/>
            <Route exact path="/readstorypost/:storyId" component={ReadStoryPost}/>
            {/*<Route exact path="/finishstory" component={FinishStory}/>*/}
            {/*<Route exact path="/finishstorypost/:storyId" component={FinishStoryPost}/>*/}

          </Switch>
        </div>

      </div>
  );
}



export default App;