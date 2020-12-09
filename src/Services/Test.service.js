import http from "../http"

const getByUserId = async (id) => {
    return await http.get(`/user/${id}`);
};

export default {
    getByUserId
}