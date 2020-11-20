import React, {useEffect, useState} from 'react';
import './style.css';
import StoryService from "../../services/story.service";
import {useHistory} from 'react-router-dom';

export default function ReadStory() {
    const [postList, setPostList] = useState([]);
    let history = useHistory()

    const retrieveStories = () => {
        StoryService.getAll()
            .then(response => {
                setPostList(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    useEffect(() => {
        retrieveStories();
    }, []);

    return (
        <div className="list row">
            <div className="ReadStory">
                {postList.map((val, key) => {
                    return (
                        <div className="Post" key={key} onClick={(() => {
                            history.push(`/readstorypost/${val.storyId}`)
                        })}>
                            <h1>{val.title}</h1>
                            <p> {val.body.length > 150 ? val.body.substring(0, 150) + "..." :
                                val.body}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
