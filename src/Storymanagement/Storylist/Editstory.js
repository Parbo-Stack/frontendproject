import React, {useState, useEffect} from "react";
import StoryService from "../../Services/Story.service";
import './styles.css'


const EditStory = props => {
    const initialStoryState = {
        id: null,
        title: "",
        body: "",
        authorId: "",
        datePublished: new Date(),
        published: false
    };
    const [currentStory, setCurrentStory] = useState(initialStoryState);
    const [message, setMessage] = useState("");

    const getStory = id => {
        StoryService.getById(id)
            .then(response => {
                setCurrentStory(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getStory(props.match.params.id);
    }, [props.match.params.id]);


    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentStory({...currentStory, [name]: value});
    };

    const updatePublished = status => {
        const data = {
            id: currentStory.id,
            title: currentStory.title,
            body: currentStory.body,
            authorId: currentStory.authorId,
            published: status
        };

        StoryService.updateStory(currentStory.storyId, data)
            .then(response => {
                setCurrentStory({...currentStory, published: status})
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
//de id is undefined omdat het de id niet herkent als id maar als b.v storyId
    const updateStory = () => {
        StoryService.updateStory(currentStory.storyId, currentStory)
            .then(response => {
                console.log(response.data);
                setMessage("The story was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            })
    };

    const deleteStory = () => {
        StoryService.deleteById(currentStory.storyId)
            .then(response => {
                console.log(response.data);
                props.history.push("/storieslist");
                console.log(props)
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div>
            {currentStory ? (
                <div className="edit-form">
                    <h4>Edit Story</h4>
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                required
                                value={currentStory.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <textarea
                            className="form-control my-3"
                            id="body"
                            required
                            value={currentStory.body}
                            onChange={handleInputChange}
                            placeholder="Body"
                            name="body">
                       </textarea>
                        <input
                            type="text"
                            id="authorId"
                            required
                            onChange={handleInputChange}
                            value={currentStory.authorId}
                            className="form-control my-3"
                            placeholder="Story Author"
                            name="authorId"
                        />
                        <input
                            id="datePublished"
                            required
                            onChange={handleInputChange}
                            value={currentStory.datePublished}
                            className="form-control my-3"
                            placeholder="Story datePublished"
                        />
                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentStory.published ? "Published" : "Pending"}
                        </div>
                    </form>

                    {currentStory.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(true)}
                        >
                            Publish
                        </button>
                    )}

                    <button
                        className="badge badge-danger mr-2"
                        onClick={deleteStory}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateStory}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br/>
                    <p>Please click on a Story...</p>
                </div>
            )}
        </div>
    );
}

export default EditStory;