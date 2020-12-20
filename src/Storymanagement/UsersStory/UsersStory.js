import React, {useEffect, useState} from "react";
import WriteStoryService from "../../Services/WriteStory.service";


const UsersStory = () => {
    const [stories, setStories] = useState([]);
    const [currentStory, setCurrentStory] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);


    useEffect(() => {
        retrieveStories();
    }, []);

    const retrieveStories = () => {
        WriteStoryService.getAll()
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
                            <label><strong>User</strong>
                            </label>{" "}
                            {currentStory.user.username}
                        </div>
                        <div>
                            <label><strong>User</strong>
                            </label>{" "}
                            {currentStory.user.email}
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

export default UsersStory ;