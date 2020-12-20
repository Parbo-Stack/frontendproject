import React, {Component} from 'react';
import CommentAdd from './CommentAdd';
import Comment from '../Comments/Comments';
import axios from '../Services/Storypart.service';

class CommentGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            body: [],
            postId: props.postId,
            storyParts: props.storyParts || [],
            datePublished: new Date(),
            isLoaded: false
        }


        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);

    }

    async componentDidMount() {
        await this.setState({storyParts: this.props.storyParts});
    }

    handleCommentSubmit(data) {
        console.log(JSON.stringify(data));
        const postData = {
            body: data,
            postId: this.state.postId,
            author: this.state.author,
            datePublished: new Date(),
        };

        axios.create(postData).then((response) => {
            console.log('response', response.data);
            let storyParts = this.state.storyParts;
            if (response.data)
                storyParts.unshift({
                    id: response.data.storyId,
                    body: response.data.body,
                    author: response.data.author,
                    localDate: response.data.localDate,
                })
            this.setState({storyParts: storyParts})
        });
    }

    renderComments() {
        return this.props.storyParts.map((comment, index) => {
            const {storyId, body, localDate, author} = comment;
            return (
                <Comment key={index} storyId={storyId} body={body} localDate={localDate} author={author}/>
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

