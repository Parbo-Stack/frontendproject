import http from "../http"

const getAllUsers = async () => {
    return await http.get('/users');
};

const getById = async (props) => {
    console.log(JSON.stringify(props))
    return await http.get(`/user/${props}`);
};

const deleteById = async (id) => {
    return await http.delete(`/user/${id}`);
};

export default {
    getAllUsers,
    getById,
    deleteById
}