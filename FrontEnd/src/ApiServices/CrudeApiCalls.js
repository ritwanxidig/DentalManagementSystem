import http, { setAuthToken } from "../http-common";

if (localStorage.getItem("token") && localStorage.getItem("token").length > 0) {
  const tokenCheck = localStorage.getItem("token");

  setAuthToken(tokenCheck);
}

export async function getAll(url) {
  try {
    const response = await http.get(url);
    if (response.status === 200) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function get(url) {
  try {
    const response = await http.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function create(url, data) {
  try {
    const response = await http.post(url, data);
    if (response.status === 201) {
      return "Saved Successfully";
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function Specialcreate(url, data) {
  try {
    const response = await http.post(url, data);
    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function update(url, data) {
  try {
    const response = await http.put(url, data);
    if (response.status === 204) {
      return "Updated Successfully";
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function Delete(url) {
  try {
    const response = await http.delete(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
