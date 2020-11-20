import React, {useState, useEffect} from "react";
import StoryService from "../../services/story.service";
import {Link} from "react-router-dom";
import './style.css'

const StoriesList = () => {
    const [stories, setStories] = useState([]);
    const [currentStory, setCurrentStory] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveStories();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

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

    // const test=() =>{
    //     console.log(currentStory.id);
    //     };
    return (
        <div className="list row">
            <div className="col-12 col-lg-6 offset-lg-3">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                </div>
            </div>
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
                            {currentStory.authorId}
                        </div>
                        <div>
                            <label><strong>Date Published</strong>
                            </label>{" "}
                            {currentStory.datePublished}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentStory.published ? "Published" : "Pending"}
                        </div>

                        <Link//de id is undefined omdat het de id niet herkent als id maar als b.v storyId
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