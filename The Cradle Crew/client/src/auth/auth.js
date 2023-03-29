import Axios from "axios";

const REACT_APP_API_USER_LOGIN = process.env.REACT_APP_API_USER_LOGIN;

export default class Auth {
  constructor() {
    Axios.defaults.withCredentials = true;
  }

  static login(username, password, callback) {
    Axios.post(REACT_APP_API_USER_LOGIN, {
      username,
      password,
    }).then((response) => {
      if (response.data.auth) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.username);
        localStorage.setItem("type", response.data.type);
      }
      callback(response);
    });
  }
}
