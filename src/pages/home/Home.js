import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import './styles.css';
import {Card, CardImg, CardText} from 'reactstrap';
import UserService from "../../services/user.service";

const Home = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="home">
            <h1><span>"Welcome to Owie's Story Page"</span></h1>
            <div className="grid">
                <div className="box1">
                    <Link to={"/readstory"}>
                        <CardText>Continue to Read a Story</CardText>
                        {/*<Card>*/}
                        {/*    <CardImg top width="100%"*/}
                        {/*             src="https://www.flaticon.com/svg/static/icons/svg/3330/3330842.svg"/>*/}
                        {/*</Card>*/}
                    </Link>
                </div>
                {/*<div className="box2">*/}
                {/*    <CardText>Write Story</CardText>*/}
                {/*    <Link to={"/writestory"}>*/}
                {/*        <Card>*/}
                {/*            <CardImg top width="100%"*/}
                {/*                     src="https://www.flaticon.com/svg/static/icons/svg/996/996371.svg"/>*/}
                {/*        </Card>*/}
                {/*    </Link>*/}
                {/*</div>*/}
                {/*<div className="box3">*/}
                {/*    <CardText>Finish Story</CardText>*/}
                {/*    <Link to={"/finishstory"}>*/}
                {/*        <Card>*/}
                {/*            <CardImg top width="100%"*/}
                {/*                     src="https://www.flaticon.com/svg/static/icons/svg/3194/3194321.svg"/>*/}
                {/*        </Card>*/}
                {/*    </Link>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Home;