import http from "../http-common";

export async function getAll() {
  return http
    .get("/Appointments")
    .then((res) => {
      if (res.status == 200) return res.data;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
}

export async function getTodayApps() {
  return http
    .get("/TodayAppointment")
    .then((res) => {
      if (res.status == 200) return res.data;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
}


export async function getPendingApps() {
  return http
    .get("/PendingAppointments")
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
    .get(`/Appointments/${id}`)
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
    .post("/Appointments", data)
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
  return http.put(`/Appointments/${id}`, data).then((response) => {
    window.location.href = "/Appointments";
    return "updated Successfully";
  });
}

export async function Delete(id) {
  return http
    .delete(`/Appointments/${id}`)
    .then((res) => {
      window.location.href = "/Appointments";
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
}
