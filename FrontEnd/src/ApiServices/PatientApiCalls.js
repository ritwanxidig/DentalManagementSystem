import { redirect } from "react-router-dom";
import http, { setAuthToken } from "../http-common";

if (localStorage.getItem("token") && localStorage.getItem("token").length > 0) {
  const tokenCheck = localStorage.getItem("token");

  setAuthToken(tokenCheck);
}

export async function getAll() {
  return http
    .get("/Patients")
    .then((res) => {
      if (res.status == 200) return res.data;
    })
    .catch((e) => {
      return e;
    });
}
export async function get(id) {
  return http
    .get(`/Patients/${id}`)
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
    .post("/Patients", data)
    .then((response) => {
      if (response.status == 201) {
        window.location.href = "/Patients";
        return "Saved Successfully";
      }
    })
    .catch((e) => {
      return e;
    });
}

export async function update(id, data) {
  return http.put(`/Patients/${id}`, data).then((response) => {
    window.location.href = "/Patients";
    return "updated Successfully";
  });
}

export async function Delete(id) {
  return http
    .delete(`/Patients/${id}`)
    .then((res) => {
      window.location.href = "/Patients";
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
}
