import http from "../http";

const create = (data) => {
    // console.log(JSON.stringify({data}))
    return http.post(`/story/${data.storyId}/storypart`, {body:data.body});
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
    deleteById,
};
