import React,{useState, useEffect} from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';
import AuthService from '../Services/Auth.service'
import StoriesList from "../Storymanagement/Storylist/Storylist";
import EditStory from "../Storymanagement/Editstory/Editstory";
import ReadStory from "../Pages/Readstory/Readstory";
import ReadStoryPost from "../Pages/Readstory/Readstorypost/Readstorypost";
import Login from "../Components/Login";
import Register from "../Components/Register";
import BoardUser from "../Components/BoardUser";
import AddStory from "../Storymanagement/Addstory/Addstory";
import Profile from "../Components/Profile";
import BoardAdmin from "../Components/BoardAdmin";
import EditUser from "../Components/EditUser";
import StoryPartList from "../Storymanagement/StoryPart/StoryPartList";
import EditPart from "../Storymanagement/StoryPart/EditPart";
import HomePage from "../Pages/HomePage/HomePage";
import WriteStory from "../Pages/Writestory/Writestory";
import UsersStory from "../Storymanagement/UsersStory/UsersStory";


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
            <Route exact path={["/", "/home"]} component={HomePage}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register}/>
            <Route exact path="/profile" component={Profile} />
            <ProtectedRoute path="/user" component={BoardUser}/>
            <ProtectedRoute path="/addstory" component={AddStory}/>
            <ProtectedRoute path="/storieslist" component={StoriesList}/>
            <ProtectedRoute path="/editstory/:id" component={EditStory}/>
            <ProtectedRoute path="/readstory" component={ReadStory}/>
            <ProtectedRoute path="/writestory" component={WriteStory}/>
            <ProtectedRoute path="/admin" component={BoardAdmin}/>
            <ProtectedRoute path="/edituser/:id" component={EditUser}/>
            <ProtectedRoute path="/partslist" component={StoryPartList}/>
            <ProtectedRoute path="/usersstory" component={UsersStory}/>
            <ProtectedRoute path="/deletepart/:id" component={EditPart}/>
            <ProtectedRoute path="/readstorypost/:storyId" component={ReadStoryPost}/>
            <Route path="" component={() => "404 NOT FOUND"}/>
        </Switch>

);
}
export default PageRouting;