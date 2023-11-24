import http from "../http-common";

export async function getAll() {
  return http
    .get("/Invoices")
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
    .get(`/Invoices/${id}`)
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
    .post("/Invoices", data)
    .then((response) => {
      if (response.status == 201) {
        return "Saved Successfully";
      }
    })
    .catch((e) => {
      return e;
    });
}

export async function update(id, data) {
  return http.put(`/Invoices/${id}`, data).then((response) => {
    window.location.href = "/Invoices";
    return "updated Successfully";
  });
}

export async function Delete(id) {
  return http
    .delete(`/Invoices/${id}`)
    .then((res) => {
      window.location.href = "/Invoices";
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
}
