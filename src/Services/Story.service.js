import http from "../http"

const getAll = async () => {
    return await http.get('/stories');
};
//props hier doorgeven omdat het de id niet erkent dus als props geeft hij het door
const getById = async (props) => {
    return await http.get(`/stories/${props}`);
};

const findByTitle = async (title) => {
    return await http.get(`/findbytitle?title=${title}`);
};

const createStory = async (data) => {
    return await http.post('/story/admin', data);
};

const updateStory = async (id, data) => {
    return await http.put(`/story/${id}`, data);
};

const deleteById = async (props) => {
    return await http.delete(`/story/${props}`);
};

const removeAll = async () => {
    return await http.delete(`/story`);
};

export default {
    getAll,
    getById,
    createStory,
    updateStory,
    deleteById,
    removeAll,
    findByTitle
}