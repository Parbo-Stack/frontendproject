import React, {Component} from 'react';
import CommentAdd from './CommentAdd';
import Comment from '../Comments/Comments';
import http from '../Services/Storypart.service';

class CommentGroup extends Component {
    constructor(props) {
        super(props);

        // let arrUrl = window.location.href.split('/');

        this.state = {
            body: [
                {id: 1, body: 'This is the first'},
                {id: 2, body: 'This is the second'}
            ],
            postId: props.postId
        }

        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);

    }

    handleCommentSubmit(data) {
        const postData = {
            body: data,
            storyId: this.state.postId,
        };

        http.create(postData).then((response) => {
            console.log('response', response.data);
            let storyparts = this.state.storyparts;
            storyparts.unshift({
                id: response.data.id,
                body: response.data.body
            })
            this.setState({storyparts: storyparts})
        });
    }

    renderComments() {
        const {storyparts} = this.state;
        storyparts.map(comment => {
            const {id, body} = comment;
            return (
                <Comment key={id} body={body}/>
            );
        })
    }

    render() {
        return (

            <div>
                <Comment/>
                <CommentAdd handleCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
}

export default CommentGroup;

