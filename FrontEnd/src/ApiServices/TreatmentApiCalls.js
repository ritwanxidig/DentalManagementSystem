import http from "../http-common";

export async function getAll() {
  return http
    .get("/Treatments")
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
    .get(`/Treatments/${id}`)
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
    .post("/Treatments", data)
    .then((response) => {
      if (response.status == 201) {
        window.location.href = "/Treatments";
        return "Saved Successfully";
      }
    })
    .catch((e) => {
      return e;
    });
}

export async function update(id, data) {
  return http.put(`/Treatments/${id}`, data).then((response) => {
    window.location.href = "/Treatments";
    return "updated Successfully";
  });
}

export async function Delete(id) {
  return http
    .delete(`/Treatments/${id}`)
    .then((res) => {
      window.location.href = "/Treatments";
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
}
