import React, {Component} from 'react';
import CommentAdd from './CommentAdd';
import Comment from '../Comments/Comments';
import axios from '../Services/Storypart.service';
import AuthHeader from "../Services/Auth-header";

class CommentGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            body: [],
            postId: props.postId,
            storyParts: [],
            isLoaded: false
        }

        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);

    }

    handleCommentSubmit(data) {
        console.log(JSON.stringify(data));
        const postData = {
            body: data,
            postId: this.state.postId,
        };

        axios.create(postData).then((response) => {
            console.log('response', response.data);
            let storyParts = this.state.storyParts;
            if (response.data)
                storyParts.unshift({
                    id: response.data.id,
                    body: response.data.body,
                    // storyParts:response.data.storyParts
                })
            this.setState({storyParts: storyParts})
        });
    }

    renderComments() {
        const {storyParts} = this.state;
        storyParts.map(comment => {
            const {id, body} = comment;
            return (
                <Comment key={id} body={body}/>
            );
        })
    }

    // async componentDidMount() {
    //     let {postId} = this.props;
    //     console.log(JSON.stringify(postId))
    //     fetch(`http://localhost:8081/api/story/${postId}/storyparts`,{headers: AuthHeader()})
    //         .then((storyParts) => {
    //             console.log(JSON.stringify(storyParts))
    //         this.setState({storyParts})
    //     })
        // http.fetchStoryParts(storyId, {headers: AuthHeader()})
        //     .then((storyParts) => {
        //         console.log(JSON.stringify(storyParts))
        //         this.setState({storyParts})
        //     })

    // }

    render() {
        return (
            <div>
                <Comment/>
                {this.renderComments()}
                <CommentAdd handleCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
}

export default CommentGroup;

