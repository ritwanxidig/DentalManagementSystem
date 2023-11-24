import http from "../http-common";

export async function getAll() {
  return http
    .get("/Services")
    .then((res) => {
      if (res.status == 200) return res.data;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
}
export async function get(id) {
  return http
    .get(`/Services/${id}`)
    .then((response) => {
      if (response.status == 200) return response.data;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
}

export async function create(data) {
  return http
    .post("/Services", data)
    .then((response) => {
      if (response.status == 201) {
        window.location.href = "/Services";
        return "Saved Successfully";
      }
    })
    .catch((e) => {
      return e;
    });
}

export async function update(id, data) {
  return http.put(`/Services/${id}`, data).then((response) => {
    window.location.href = "/Services";
    return "updated Successfully";
  });
}

export async function Delete(id) {
  return http
    .delete(`/Services/${id}`)
    .then((res) => {
      window.location.href = "/Services";
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
}
