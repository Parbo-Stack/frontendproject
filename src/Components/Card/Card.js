import React from 'react';
import './Style.css';


const Card = (props) => {
    return (
        <div className="Card">
            <a href="/readstory" className="title">
                {props.read}
                {props.avatar}
            </a>

            <a href="/writestory" className="writestory">
                {props.write}
                {props.avatarwrite}
            </a>

            <a href="/finishstory" className="finishstory">
                {props.finish}
                {props.avatarfinish}
            </a>

        </div>

    );
};

export default Card;

