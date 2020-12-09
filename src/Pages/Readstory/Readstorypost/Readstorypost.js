import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import StoryService from "../../../Services/Story.service";
import './styles.css'
import CommentGroup from "../../../Comments/CommentGroup";

export default function ReadStoryPost() {
    let {storyId} = useParams();
    const [post, setPost] = useState({})

    //i need to pass the userId also..youtube tutorials..facebook clone etc
    //de storyId word al meegezonden, dit werkt wel via postman
    const getStory = () => {
        StoryService.getById(storyId)
            .then(response => {
                setPost(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getStory();
    }, []);

    return (
        <div className="PostContainer">
            <h1> {post.title} </h1>
            <p> {post.body} </p>
            <h3 className="date">posted on: {post.localDate}</h3>
            <CommentGroup postId={storyId}/>
        </div>
    );
}