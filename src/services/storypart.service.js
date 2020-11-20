import http from "../http";

const create = (storyId,data) => {
    return http.post(`/story/${storyId}/storypart`, data);
}

const save = () => {
    return http.post('/storypart/savestorypart')
}


export default {
    create,
    save
};