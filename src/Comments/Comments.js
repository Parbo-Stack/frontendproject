import React, {Component} from "react";

class Comment extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const {body} = this.props;
        return (
            <div>{body}</div>
        );
    }
}

export default Comment;