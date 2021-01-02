import React, {useEffect, useState} from "react";
import StoryService from '../../Services/Story.service';

const UsersStory = () => {
    const [stories, setStories] = useState([]);
    const [currentStory, setCurrentStory] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);


    useEffect(() => {
        retrieveStories();
    }, []);

    const retrieveStories = () => {
        StoryService.nullTitle()
            .then(response => {
                setStories(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveStories();
        setCurrentStory(null);
        setCurrentIndex(-1);
    };

    const setActiveStory = (story, index) => {
        setCurrentStory(story);
        setCurrentIndex(index);
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Users Story</h4>

                <ul className="list-group">
                    {stories &&
                    stories.map((story, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveStory(story, index)}
                            key={index}
                        >
                            {story.body}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentStory ? (
                    <div>
                        <h4>Story</h4>
                        <div>
                            <label>
                                <strong>Body:</strong>
                            </label>{" "}
                            {currentStory.body}
                        </div>
                        <div>
                            <label>
                                <strong>Author</strong>
                            </label>{" "}
                            {currentStory.author}
                        </div>
                        <div>
                            <label><strong>Date Published</strong>
                            </label>{" "}
                            {currentStory.datePublished}
                        </div>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Story...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersStory;