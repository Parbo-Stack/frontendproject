import React, {useEffect, useState} from 'react';
import StoryService from "../../Services/Story.service";
import {useHistory} from 'react-router-dom';
import '../../Styles/Story.css';

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
            <div className="Story">
                {postList.map((val, key) => {
                    return (
                        <div className="Post" key={key} onClick={(() => {
                            history.push(`/readstorypost/${val.storyId}`)
                        })}>
                            <style>{'Post {h1: font-family: Arial, serif;}'}</style>
                            <h1 className="title">{val.title}</h1>
                            <p> {val.body.length > 100 ? val.body.substring(0, 100) + "..." :
                                val.body}</p>
                            <h2 className="localDate">posted on: {val.localDate}</h2>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
