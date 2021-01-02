import http from "../http";

const create = async (data) => {
    return await http.post('/finishstory', data);
};

const getAll = async () => {
    return await http.get('/finishstory');
};

const getById = async (props) => {
    return await http.get(`/finishstory/${props}`);
};
export default {
    create,
    getAll,
    getById
}