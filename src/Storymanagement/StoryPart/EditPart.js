import React, {useEffect, useState} from "react";
import StoryPartService from "../../Services/Storypart.service";

const EditPart = props => {
    const initialStoryState = {
        id: null,
        body: "",
        localDate: "",
        storyPartId: "",
        published: false
    };

    const [currentPart, setCurrentPart] = useState(initialStoryState);
    const [message, setMessage] = useState("");


    const getPart = id => {
        StoryPartService.getById(id)
            .then(response => {
                setCurrentPart(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getPart(props.match.params.id);
    }, [props.match.params.id]);


    const deletePart = () => {
        StoryPartService.deleteById(currentPart.storyPartId)
            .then(response => {
                console.log(response.data);
                props.history.push("/partslist");
                console.log(props)
            })
            .catch(e => {
                console.log(e);
            });
    }


    return (
        <div>
            {currentPart ? (
                <div className="edit-form">
                    <h4>Delete Part</h4>
                    <form>
                        <div className="form-group">
                            <label className="body">Body:</label>
                            <textarea className="form-control my-3"
                                      id="body"
                                      required
                                      value={currentPart.body}
                                      disabled
                            />
                        </div>
                        <label className="localDate">Local Date:</label>
                        <input
                            id="localDate"
                            required
                            value={currentPart.localDate}
                            disabled
                        />
                        <label className="userid">Story PartId:</label>
                        <input
                            id="storyPartId"
                            required
                            value={currentPart.storyPartId}
                            disabled
                        />
                    </form>
                    <br/>
                    <button
                        className="badge badge-danger mr-2"
                        onClick={deletePart}>
                        Delete
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br/>
                    <p>Please click on a Story Part...</p>
                </div>
            )}
        </div>
    );
}
export default EditPart;