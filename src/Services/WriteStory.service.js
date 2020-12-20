import http from "../http";

const create = async (data) => {
    return await http.post(`/writestory`, data);
};

const getStoryById = async (id) => {
    return await http.get(`/writestory/${id}`);
};

const getAll = async () => {
    return await http.get('/writestories');
};

export default {
    create,
    getStoryById,
    getAll
}