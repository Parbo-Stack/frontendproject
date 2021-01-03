import React, {useEffect, useState} from "react";
import StoryService from '../../Services/Story.service'
import {useHistory} from 'react-router-dom';
import '../../Styles/Story.css';

export default function FinishStory() {
    const [postList, setPostList] = useState([]);
    let history = useHistory()

    const retrieveStories = () => {
        StoryService.finishStory()
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
            <div style={{fontFamily:"Oxygen", textAlign:"center",fontSize:"20px"}} className="Intro"><h1 style={{fontSize:"30px", fontWeight:"bold", color:"blue"}}>
                Ik begin en jij gaat verder!</h1>
           <p style={{ fontStyle: "italic", display: 'inline-block', justifyContent: 'space-between'}}> Kies een verhaal en voeg jou eigen versie eraan toe <br/>
            (scheldwoorden zijn verboden en worden verwijderd)</p>
           </div>
            <div className="Story">
                {postList.map((val, key) => {
                    return (
                        <div className="Post" key={key} onClick={(() => {
                            history.push(`/finishstorypost/${val.storyId}`)
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