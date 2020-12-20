import React, {useState} from 'react';
import WriteStoryDataService from "../../Services/WriteStory.service"

const WriteStory = () => {
    const initialStoryState = {
        id: null,
        title: "",
        body: "",
        authorId: "",
        datePublished: new Date()
    };

    const [write, setWrite] = useState(initialStoryState);
    const [submitted, setSubmitted] = useState(false);


    const handleInputChange = event => {
        const {name, value} = event.target;
        setWrite({...write, [name]: value});
    };

    const saveStory = () => {
        const data = {
            title: write.title,
            body: write.body,
            authorId: write.authorId,
            datePublished: write.datePublished,
        };

        WriteStoryDataService.create(data)
            .then(response => {
                setWrite({
                    id: response.data.id,
                    title: response.data.title,
                    body: response.data.body,
                    authorId: response.data.authorId,
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
        setWrite(initialStoryState);
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
                    <h1 style={{fontSize:"30px", textAlign:"center", fontWeight:"bold", color:"Lightblue"}}>Hoe creatief ben je?</h1>
                    <p style={{fontStyle: "italic"}}>Schrijf en post je eigen verhaal en naar ons toe, wordt het door ons goedgekeurd, posten wij volgend week op onze site!
                    vergeet je naam niet, en scheldwoorden zijn niet toegestaan.</p>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={write.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                        name="title"
                    />
                    <textarea
                        rows='10'
                        className="form-control my-3"
                        id="body"
                        required
                        value={write.body}
                        onChange={handleInputChange}
                        placeholder="Body..."
                        name="body">
        </textarea>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="authorId"
                            required
                            value={write.authorId}
                            placeholder="Author"
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
                            value={write.datePublished}
                            onChange={handleInputChange}
                            name="datePublished"
                            disabled
                        />
                        <br/>
                        <button onClick={saveStory} className="btn btn-primary float-right">
                            Submit Your Story
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};
export default WriteStory;
