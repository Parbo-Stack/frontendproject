import React, {useState} from "react";

function CommentAdd(props) {

    const {handleCommentSubmit} = props;

    const [storyPart, setStoryPart] = useState('');

    return (
        <div>
            <div className="card mt-4 mb-3">
                <div className="card-header"><strong>Comments</strong></div>
                <div className="card-body">
                    <textarea name="comments" className="form-control" placeholder="Add a new comment"
                              onChange={event => setStoryPart(event.target.value)} value={storyPart}/>
                </div>
            </div>
            <div>
                <button className="btn btn-primary mr-3" onClick={event =>  {
                    // console.log(JSON.stringify(storyPart))
                    handleCommentSubmit (storyPart);
                    setStoryPart('');
                }}>Comment</button>
                {/*<button className="btn btn-warning"> Close issue</button>*/}
            </div>
        </div>
    );

}

export default CommentAdd;