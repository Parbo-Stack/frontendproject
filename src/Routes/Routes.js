import React,{useState, useEffect} from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';
import AuthService from '../Services/Auth.service'
import StoriesList from "../Storymanagement/Storylist/Storylist";
import EditStory from "../Storymanagement/Editstory/Editstory";
import Readstory from "../Pages/Readstory/Readstory";
import ReadStoryPost from "../Pages/Readstory/Readstorypost/Readstorypost";
import Home from "../Pages/Home/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import BoardUser from "../Components/BoardUser";
import AddStory from "../Storymanagement/Addstory/Addstory";
import Profile from "../Components/Profile";

const PageRouting = () => {
const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(AuthService.getCurrentUser());
        }
    }, []);


    const ProtectedRoute = ({ component: Component, ...rest }) => ( // ProtectedRoute is a component with props
        <Route
            {...rest} render={props => {
            if (currentUser !== undefined) { // If a user is logged in
                return <Component {...props} />; // Return the component and set (spread) the props
            } else {
                return <Redirect to="/"/>; // Otherwise redirect to the home page
            }
        }} />
    )


   return(
        <Switch>
            <Route exact path={["/", "/home"]} component={Home}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register}/>
            <Route exact path="/profile" component={Profile} />
            <ProtectedRoute path="/user" component={BoardUser}/>
            <ProtectedRoute path="/addstory" component={AddStory}/>
            <ProtectedRoute path="/storieslist" component={StoriesList}/>
            <ProtectedRoute path="/editstory/:id" component={EditStory}/>
            <ProtectedRoute path="/readstory" component={Readstory}/>
            <ProtectedRoute path="/readstorypost/:storyId" component={ReadStoryPost}/>
            <Route path="" component={() => "404 NOT FOUND"}/>
        </Switch>

);
}
export default PageRouting;