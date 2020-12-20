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

const updateUser = async (id) => {
    return await http.put(`/user/${id}`)
}

export default {
    getAllUsers,
    getById,
    deleteById,
    updateUser
}