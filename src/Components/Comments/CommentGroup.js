import React, {Component} from 'react';
import CommentAdd from './CommentAdd';
import Comment from './Comments';
import axios from '../../Services/Storypart.service';

class CommentGroup extends Component {
    constructor(props) {
        super(props);

        let arrUrl = window.location.href.split('/');
        let storyId = arrUrl[arrUrl.length - 1];

        this.state = {
            loading: false,
            body: [],
            localDate: new Date(),
            storyId: storyId
        }

        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    componentDidUpdate() {
        axios.getAll(this.state.storyId).then (response => {
            console.log('res',response.data)
        });
    }

    handleCommentSubmit(data) {
        const postData = {
            body: data,
            storyId: this.state.storyId,
            localDate: new Date(),
        };

        console.log(postData)

        axios.create(postData).then((response) => {
            console.log('response', response.data);
            let comments = this.props.comments;
            comments.unshift({
                id: response.data.id,
                body: response.data.body,
                localDate: response.data.localDate,
            });
            this.setState({comments: comments});
        })
    }

    renderComments() {
        return this.props.comments.map((comment, id) => {
            const {storyId, body, localDate} = comment;
            return (
                <Comment key={id} storyId={storyId} body={body} localDate={localDate}/>
            );
        })
    }

    render() {
        return (
            <div>
                {this.renderComments()}
                <CommentAdd handleCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
}

export default CommentGroup;

