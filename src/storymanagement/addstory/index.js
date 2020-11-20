import React, {useState} from 'react';
import StoryDataService from "../../services/story.service";
import './style.css'


const AddStory = () => {
    const initialStoryState = {
        id: null,
        title: "",
        body: "",
        authorId: "",
        byte: "",
        datePublished: new Date()
    };

    const [story, setStory] = useState(initialStoryState);
    const [submitted, setSubmitted] = useState(false);


    const handleInputChange = event => {
        const {name, value} = event.target;
        setStory({...story, [name]: value});
    };

    const saveStory = () => {
        const data = {
            title: story.title,
            body: story.body,
            authorId: story.authorId,
            byte: story.byte,
            datePublished: story.datePublished,
        };

        StoryDataService.createStory(data)
            .then(response => {
                setStory({
                    id: response.data.id,
                    title: response.data.title,
                    body: response.data.body,
                    authorId: response.data.authorId,
                    datePublished: response.data.datePublished,
                    byte: response.byte,
                    published: response.data.published
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newStory = () => {
        setStory(initialStoryState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={newStory}>
                            Add
                        </button>
                    </div>
                ) :
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={story.title}
                        onChange={handleInputChange}
                        name="title"
                    />
                    <textarea
                        rows='10'
                        className="form-control my-3"
                        id="body"
                        required
                        value={story.body}
                        onChange={handleInputChange}
                        placeholder="Body"
                        name="body">
        </textarea>
                    <div className="form-group">
                        <label htmlFor="authorId">Author</label>
                        <input
                            type="text"
                            className="form-control"
                            id="authorId"
                            required
                            value={story.authorId}
                            onChange={handleInputChange}
                            name="authorId"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="datePublished">Date Published</label>
                        <input
                            type="text"
                            className="form-control"
                            id="datePublished"
                            required
                            value={story.datePublished}
                            onChange={handleInputChange}
                            name="datePublished"
                        />
                        <br/>
                        <button onClick={saveStory} className="btn btn-primary float-right">
                            Submit Read Story
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};
export default AddStory;