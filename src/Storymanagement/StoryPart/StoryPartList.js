import React, {useEffect, useState} from "react";
import StoryPartService from "../../Services/Storypart.service";
import {Link} from "react-router-dom";

const StoryPartList = () => {
    const [parts, setParts] = useState([]);
    const [currentPart, setCurrentPart] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        retrieveParts();
    }, []);

    const retrieveParts = () => {
        StoryPartService.getAll()
            .then(response => {
                setParts(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };


    const refreshList = () => {
        retrieveParts();
        setCurrentPart(null);
        setCurrentIndex(-1);
    };

    const setActivePart = (part, index) => {
        setCurrentPart(part);
        setCurrentIndex(index);
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Story Parts</h4>

                <ul className="list-group">
                    {parts &&
                    parts.map((part, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActivePart(part, index)}
                            key={index}
                        >
                            {part.body}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentPart ? (
                    <div>
                        <h4>Parts</h4>
                        <div>
                            <label>
                                <strong>Body:</strong>
                            </label>{" "}
                            {currentPart.body}
                        </div>
                        <div>
                            <label>
                                <strong>LocalDate:</strong>
                            </label>{" "}
                            {currentPart.localDate}
                        </div>
                        <div>
                            <label>
                                <strong>Id:</strong>
                            </label>{" "}
                            {currentPart.storyPartId}
                        </div>
                        {/*<div>*/}
                        {/*    <label>*/}
                        {/*        <strong>Id:</strong>*/}
                        {/*    </label>{" "}*/}
                        {/*    {currentPart.user.username}*/}
                        {/*</div>*/}
                        <Link
                            to={"/deletepart/" + currentPart.storyPartId}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                        {console.log(JSON.stringify(currentPart.storyPartId))}
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Story...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoryPartList;