import http from "../http-common";

class UserServices {
  getAll() {
    return http.get("/Users");
  }
  get(id) {
    return http.get(`/Users/${id}`);
  }

  create(data) {
    return http.post("/Users", data);
  }

  update(id, data) {
    return http.put(`/Users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Users/${id}`);
  }
}

export default new UserServices
