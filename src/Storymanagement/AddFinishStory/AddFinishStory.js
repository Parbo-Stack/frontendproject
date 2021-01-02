import React, {useState} from 'react';
import StoryService from '../../Services/Story.service'
import './Style.css'


const AddFinishStory = () => {
    const initialFinishStoryState = {
        id: null,
        title:"",
        body: "",
        datePublished: new Date()
    }

    const [finishStory, setFinishStory] = useState(initialFinishStoryState)
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setFinishStory({...finishStory, [name]: value});
    };

    const saveStory = () => {
        const data = {
            title:finishStory.title,
            body: finishStory.body,
            datePublished: finishStory.datePublished,
        };

        StoryService.createStory(data)
            .then(response => {
                setFinishStory({
                    id: response.data.id,
                    title:response.data.title,
                    body: response.data.body,
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
        setFinishStory(initialFinishStoryState);
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
                        value={finishStory.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                        name="title"
                    />
                    <textarea
                        rows='10'
                        className="form-control my-3"
                        id="body"
                        required
                        value={finishStory.body}
                        onChange={handleInputChange}
                        placeholder="Body..."
                        name="body">
        </textarea>
                    <div className="form-group">
                        <label htmlFor="datePublished">Date Published</label>
                        <input
                            type="text"
                            className="form-control"
                            id="datePublished"
                            required
                            value={finishStory.datePublished}
                            onChange={handleInputChange}
                            name="datePublished"
                            disabled
                        />
                        <br/>
                        <button onClick={saveStory} className="btn btn-primary float-right">
                            Submit Story
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default AddFinishStory;