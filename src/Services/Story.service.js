import http from "../http"

const findAllByAuthorIsNotNull = async () => {
    return await http.get('/stories');
};

const finishStory = async () => {
    return await http.get('/stories/author');
};

const getAll = async () => {
    return await http.get('/stories');
};

const getById = async (props) => {
    return await http.get(`/stories/${props}`);
};

const nullTitle = async () => {
    return await http.get('/stories/titleIsNull');
};

const createStory = async (data) => {
    return await http.post('/story', data);
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
    finishStory,
    findAllByAuthorIsNotNull,
    getById,
    getAll,
    createStory,
    updateStory,
    deleteById,
    removeAll,
    nullTitle
}