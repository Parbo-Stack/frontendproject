import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import StoryService from "../../../services/story.service";
import './styles.css'

export default function ReadStoryPost() {
    let {storyId} = useParams();

    const [post, setPost] = useState({})

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
            <h1>{post.title}</h1>
            <p> {post.body}</p>
        </div>
    );
}