import React, {useState} from "react";

function CommentAdd(props) {

    const {handleCommentSubmit} = props;

    const [comment, setComment] = useState('');

    return (
        <div>
            <div className="card mt-4 mb-3">
                <div className="card-header"><strong>Comments</strong></div>
                <div className="card-body">
                    <textarea name="comments" className="form-control" placeholder="Add a new comment"
                              onChange={event => setComment(event.target.value)} value={comment}/>
                </div>
            </div>
            <div>
                <button className="btn btn-primary mr-3" onClick={event => {
                    handleCommentSubmit(comment);
                    setComment('');
                }}>Comment</button>
            </div>
        </div>
    );
}

export default CommentAdd;