import axios from "axios";

export const axiosInstnce = axios.create({});

export const apiConnector = (method, url1, body, headers, params) => {
  return axiosInstnce({
    method: `${method}`,
    url: `${url1}`,
    data: body ? body : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
