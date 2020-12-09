// import React, {useState} from 'react';
// import StoryPartService from '../Services/Storypart.service'
// // import {useSelector} from "react-redux";
//
// function StoryParts(props) {
//     // const user = useSelector(state => state.user )
//     const [StoryPart, setStoryPart] = useState("")
//
//     const handleChange = (e) => {
//         setStoryPart(e.currentTarget.value)
//     }
//
//     const onSubmit = (e) => {
//         e.preventDefault();
//
//         const variables = {
//             content: StoryParts,
//             // author: user.userData.StoryId
//             postId: props.postId
//         }
//
//         StoryPartService.create(variables)
//             .then(response => {
//                 if (response.data.success) {
//                     setStoryPart("")
//                     props.refreshFunction(response.data.result)
//                 } else {
//                     alert('Failed to save story')
//                 }
//             })
//     }
//
//     return (
//         <div>
//             <div className="card mt-4 mb-3">
//                 <div className="card-header">
//                     <strong>Replies</strong></div>
//                 {/*{console.log(props.StoryPartLists)}*/}
//                 <div className="card-body" onSubmit={onSubmit}>
//                     <textarea
//                         name="comments"
//                         className="form-control"
//                         placeholder="Finish the Story"
//                         value={StoryPart}
//                         onChange={handleChange}
//                     />
//                 </div>
//             </div>
//             <div>
//                 <button
//                     className="btn btn-primary mr-3" onClick={onSubmit}>Submit
//                 </button>
//             </div>
//
//         </div>
//     )
// }
//
// export default StoryParts;