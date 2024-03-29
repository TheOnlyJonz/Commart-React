import http from "../http-common";

class TutorialDataService {
    getAll() {
        return http.get("/tutorials");
    }

    get(id) {
        return http.get(`/tutorials/${id}`);
    }

    create(data) {
        return http.post("/tutorials", data);
    }

    uploadImg(data){
        return http.post("/tutorials/upload", data)
    }

    update(id, data) {
        return http.put(`/tutorials/${id}`, data);
    }

    delete(id) {
        return http.delete(`/tutorials/${id}`);
    }

    deleteAll() {
        return http.delete(`/tutorials`);
    }

    findByTitle(title,priceMin,priceMax) {
        return http.get(`/tutorials?title=${title}&priceMin=${priceMin}&priceMax=${priceMax}`);
    }

    findImg(id){
        return http.get(`/tutorials/img?tutorial_id=${id}`)
    }

}

export default new TutorialDataService();