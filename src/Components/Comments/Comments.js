import React, {Component} from "react";

class Comment extends Component {

    render() {

        const {body, localDate} = this.props;

        return (

            <div className="comment card mb-2">

                <div className="card-body">

                    {body} <br/>

                    <strong>created at:</strong> {localDate}

                </div>

            </div>
        );
    }
}

export default Comment;