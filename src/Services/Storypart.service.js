import http from "../http";

//de storyId geeft het door als een object, proberen de storyId te verkrijgen? kijken als dat werkt
const create = (data) => {
    //(JSON.stringify to get the info
    console.log(JSON.stringify({data}))
    return http.post(`/story/${data.storyId}/storypart`);
}

export default {
    create

};
