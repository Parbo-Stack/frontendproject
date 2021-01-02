import React, {useState, useEffect} from "react";
import StoryService from "../../Services/Story.service";
import {Link} from "react-router-dom";
import './style.css'

const StoriesList = () => {
    const [stories, setStories] = useState([]);
    const [currentStory, setCurrentStory] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        retrieveStories();
    }, []);

    const retrieveStories = () => {
        StoryService.getAll()
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

    const removeAllStories = () => {
        StoryService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Stories List</h4>

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
                            {story.title}
                        </li>
                    ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllStories}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentStory ? (
                    <div>
                        <h4>Story</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentStory.title}
                        </div>
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
                            {currentStory.localDate}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentStory.published ? "Published" : "Pending"}
                        </div>
                        <Link
                            to={"/editstory/" + currentStory.storyId}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
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

export default StoriesList;