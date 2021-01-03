import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import StoryService from "../../../Services/Story.service";
import '../../../Styles/StoryPost.css';
import CommentGroup from "../../../Components/Comments/CommentGroup";

export default function ReadStoryPost() {
    let {storyId} = useParams();
    console.log(storyId)
    const initialStoryState = {
        title: '',
        body: '',
        author: '',
        localDate: '',
        storyParts: [],
    }

    const [post, setPost] = useState(initialStoryState);

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
            <h2 className="author">Author: {post.author} </h2>
            <h3 className="date"> Posted on: {post.localDate}</h3>
            <CommentGroup postId={storyId} comments={post.storyParts}/>
        </div>
    );
}