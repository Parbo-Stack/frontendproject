import React, {useState, useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import AuthService from '../Services/Auth.service'
import StoriesList from "../Storymanagement/Storylist/Storylist";
import EditStory from "../Storymanagement/Storylist/Editstory";
import ReadStory from "../Pages/Readstory/ReadStory";
import ReadStoryPost from "../Pages/Readstory/ReadStoryPost/Readstorypost";
import Login from "../Components/Login";
import Register from "../Components/Register";
import AddStory from "../Storymanagement/Addstory/Addstory";
import DeleteUser from "../Storymanagement/UsersList/DeleteUser";
import StoryPartList from "../Storymanagement/StoryPart/StoryPartList";
import EditPart from "../Storymanagement/StoryPart/EditPart";
import HomePage from "../Pages/HomePage/HomePage";
import WriteStory from "../Pages/Writestory/Writestory";
import UsersStory from "../Storymanagement/UsersStory/UsersStory";
import AddFinishStory from "../Storymanagement/AddFinishStory/AddFinishStory";
import FinishStory from "../Pages/FinishStort/FinishStory";
import FinishStoryPost from "../Pages/FinishStort/FinishStoryPost/FinishStoryPost";
import UsersList from "../Storymanagement/UsersList/UsersList";
import About from "../Pages/About/About";


const Routes = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(AuthService.getCurrentUser());
        }
    }, []);


    const ProtectedRoute = ({component: Component, ...rest}) => (
        <Route
            {...rest} render={props => {
            if (currentUser !== undefined) {
                return <Component {...props} />;
            } else {
                return <Redirect to="/"/>;
            }
        }}/>
    )


    return (

        <Switch>
            <Route exact path={["/", "/home"]} component={HomePage}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/about" component={About}/>
            <ProtectedRoute path="/addstory" component={AddStory}/>
            <ProtectedRoute path="/addfinishstory" component={AddFinishStory}/>
            <ProtectedRoute path="/storieslist" component={StoriesList}/>
            <ProtectedRoute path="/editstory/:id" component={EditStory}/>
            <ProtectedRoute path="/readstory" component={ReadStory}/>
            <ProtectedRoute path="/writestory" component={WriteStory}/>
            <ProtectedRoute path="/finishstory" component={FinishStory}/>
            <ProtectedRoute path="/finishstorypost/:storyId" component={FinishStoryPost}/>
            <ProtectedRoute path="/userslist" component={UsersList}/>
            <ProtectedRoute path="/deleteuser/:id" component={DeleteUser}/>
            <ProtectedRoute path="/partslist" component={StoryPartList}/>
            <ProtectedRoute path="/usersstory" component={UsersStory}/>
            <ProtectedRoute path="/deletepart/:id" component={EditPart}/>
            <ProtectedRoute path="/readstorypost/:storyId" component={ReadStoryPost}/>
            <Route path="" component={() => "404 NOT FOUND"}/>
        </Switch>
    );
}
export default Routes;