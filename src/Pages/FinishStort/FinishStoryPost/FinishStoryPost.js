import React, {useEffect, useState} from "react";
import StoryService from "../../../Services/Story.service"
import { useParams } from 'react-router-dom'
import '../../../Styles/StoryPost.css'
import CommentGroup from "../../../Comments/CommentGroup";

export default function FinishStoryPost() {
    let {storyId} = useParams();
    console.log(JSON.stringify(storyId))
    const initialState = {
        title: '',
        body: '',
        localDate: '',
        storyParts: [],
    }

    const [post, setPost] = useState(initialState);

    const getFinishStory = () => {
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
        getFinishStory();
    }, []);

    return (
        <div className="PostContainer">
            <h1> {post.title} </h1>
            <p> {post.body} </p>
            <h3 className="date"> posted on: {post.localDate}</h3>
            <CommentGroup postId={storyId} comments={post.storyParts}/>
        </div>
    );
}