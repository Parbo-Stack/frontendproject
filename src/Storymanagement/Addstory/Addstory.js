import React, {useState} from 'react';
import StoryDataService from "../../Services/Story.service";
import '../../Styles/AddStory.css'

const AddStory = () => {
    const initialStoryState = {
        id: null,
        title: "",
        body: "",
        author: "",
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
            author: story.author,
            datePublished: story.datePublished,
        };


        StoryDataService.createStory(data)
            .then(response => {
                setStory({
                    id: response.data.id,
                    title:response.data.id,
                    body: response.data.body,
                    author:response.data.author,
                    datePublished: response.data.datePublished,
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
                    <br/>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={story.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                        name="title"
                    />
                    <textarea
                        rows='10'
                        className="form-control my-3"
                        id="body"
                        required
                        value={story.body}
                        onChange={handleInputChange}
                        placeholder="Body..."
                        name="body">
        </textarea>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="author"
                            required
                            value={story.author}
                            onChange={handleInputChange}
                            placeholder="Author"
                            name="author"
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