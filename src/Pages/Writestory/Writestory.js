import React, {useState} from 'react';
import StoryService from '../../Services/Story.service';

const WriteStory = () => {

    const initialStoryState = {
        id: null,
        body: "",
        author: "",
        datePublished: new Date(),
        authorError: ""

    };

    const [write, setWrite] = useState(initialStoryState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(write.authorError);
        }
        const {name, value} = event.target;
        setWrite({...write, [name]: value});
    };

    const saveStory = () => {
        const data = {
            body: write.body,
            author: write.author,
            datePublished: write.datePublished,
            authorError: write.authorError
        };


        StoryService.createStory(data)
            .then(response => {
                setWrite({
                    id: response.data.id,
                    body: response.data.body,
                    author: response.data.author,
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

    return (
        <div className="submit-form">
            {submitted ? (

                    <div>
                        <br/>
                        <h4 style={{textAlign: "center"}}>You submitted successfully!</h4>
                    </div>
                ) :

                <div className="form-group">
                    <h1 style={{fontFamily: "Oxigyn", fontSize: "30px", textAlign: "center", fontWeight: "bold", color: "blue"}}>Hoe
                        creatief ben je?</h1>
                    <p style={{fontStyle: "italic", display: 'inline-block', justifyContent: 'space-between'}}>
                        Schrijf je eigen verhaal en wordt het door ons goedgekeurd, dan posten wij het volgend week op onze site!<br/>
                        vergeet je naam niet, en scheldwoorden zijn niet toegestaan.</p>
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
                            id="author"
                            value={write.author}
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
