import http from "../http";

//de storyId geeft het door als een object, proberen de storyId te verkrijgen? kijken als dat werkt
const create = (data) => {
    //(JSON.stringify to get the info
    console.log(JSON.stringify({data}))
    return http.post(`/story/${data.postId}/storypart`, {body:data.body});
}

const getAll = async () => {
    return await http.get('/storypart');
}

const getById = async (props) => {
    console.log(JSON.stringify(props))
    return await http.get(`/storypart/${props}`);
}

const deleteById = async (id) => {
    return await http.delete(`/storypart/${id}`);
}
export default {
    create,
    getAll,
    getById,
    deleteById
};
