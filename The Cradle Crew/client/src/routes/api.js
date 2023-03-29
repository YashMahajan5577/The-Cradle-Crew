import Auth from "../auth/auth";
import Axios from "axios";

const REACT_APP_API_REQUEST_NEW_BABYSITTER =
  process.env.REACT_APP_API_REQUEST_NEW_BABYSITTER;
const REACT_APP_API_REQUEST_NEW_CRECHE =
  process.env.REACT_APP_API_REQUEST_NEW_CRECHE;
const API_REQUEST_NEW_PARENT = process.env.REACT_APP_API_REQUEST_NEW_PARENT;
const REACT_APP_API_PUT_ADMIN = process.env.REACT_APP_API_PUT_ADMIN;
const REACT_APP_API_GET_ADMIN = process.env.REACT_APP_API_GET_ADMIN;
const REACT_APP_API_GET_USER_INFO = process.env.REACT_APP_API_GET_USER_INFO;
const REACT_APP_API_GET_BABYSITTER = process.env.REACT_APP_API_GET_BABYSITTER;
const REACT_APP_API_GET_CRECHE = process.env.REACT_APP_API_GET_CRECHE;

Axios.defaults.withCredentials = true;

export default class Api {
  static auth;
  static login = (email, password, callback) => {
    Auth.login(email, password, (response) => callback(response));
  };

  static registerBabysitter = (params, callback) => {
    Axios.post(REACT_APP_API_REQUEST_NEW_BABYSITTER, params).then((response) =>
      callback(response)
    );
  };

  static registerCreche = (params, callback) => {
    Axios.post(REACT_APP_API_REQUEST_NEW_CRECHE, params).then((response) =>
      callback(response)
    );
  };

  static registerParent = (params, callback) => {
    Axios.post(API_REQUEST_NEW_PARENT, params).then((response) =>
      callback(response)
    );
  };

  static getBabysitterList = (callback) => {
    Axios.get(REACT_APP_API_GET_BABYSITTER).then((response) =>
      callback(response)
    );
  };

  static getBabysitterDetails = (username, callback) => {
    Axios.get(REACT_APP_API_GET_BABYSITTER, {
      params: {
        username,
      },
    }).then((response) => callback(response));
  };

  static getCrecheList = (callback) => {
    Axios.get(REACT_APP_API_GET_CRECHE).then((response) => callback(response));
  };

  static getCrecheDetails = (params, callback) => {
    Axios.get(REACT_APP_API_GET_CRECHE, {
      params: {
        lat: params.lat,
        long: params.long,
      },
    }).then((response) => callback(response));
  };

  static getUserList = (callback) => {
    Axios.get("http://localhost:3001/api/admin/get/users").then((response) =>
      callback(response)
    );
  };

  static getUserDetails = (username, callback) => {
    Axios.get(REACT_APP_API_GET_USER_INFO, {
      params: {
        username,
      },
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => callback(response));
  };

  static adminGetUserList = (callback) => {
    Axios.get(REACT_APP_API_GET_ADMIN).then((response) => callback(response));
  };

  static adminAcceptRequest = (username, callback) => {
    Axios.put(REACT_APP_API_PUT_ADMIN, username).then((response) =>
      callback(response)
    );
  };

  static adminDeclineRequest = (username, callback) => {
    Axios.put(REACT_APP_API_PUT_ADMIN, username).then((response) =>
      callback(response)
    );
  };

  static getAppointedBabysitter = (callback) => {
    Axios.post("http://localhost:3001/api/appoint/parent", {
      username: window.localStorage.getItem("user"),
    })
      .then((response) => callback(response))
      .catch((err) => callback(err));
  };

  static getBabysitterAppointments = (callback) => {
    Axios.post("http://localhost:3001/api/appoint/get", {
      username: window.localStorage.getItem("user"),
    })
      .then((response) => callback(response))
      .catch((err) => callback(err));
  };

  static bookBabysitter = (params, callback) => {
    Axios.post("http://localhost:3001/api/appoint/", params)
      .then((response) => {
        callback(response);
      })
      .catch((err) => callback(err));
  };

  // new apis
  static acceptAppointment = (parentUsername, meetingLink, callback) => {
    Axios.post("http://localhost:3001/api/appoint/accept", {
      username: window.localStorage.getItem("user"),
      parentUsername: parentUsername,
      meetingLink: meetingLink,
    }).then((response) => callback(response));
  };

  static deleteAppointment = (parentUsername, callback) => {
    Axios.delete("http://localhost:3001/api/appoint/accept", {
      parentUsername,
      username: window.localStorage.getItem("user"),
    }).then((response) => callback(response));
  };

  static sendFeedback = (name, email, message, callback) => {
    Axios.post("http://localhost:3001/api/users/feedback", {
      name,
      email,
      message,
    }).then((response) => callback(response));
  };

  static getFeedbacks = (callback) => {
    Axios.get("http://localhost:3001/api/users/feedback").then((response) =>
      callback(response)
    );
  };

  static editProfile = (params, callback) => {
    Axios.put("http://localhost:3001/api/users/profile/update", params).then(
      (response) => callback(response)
    );
  };

  static deleteProfile = (username, callback) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/api/users/profile", requestOptions)
      .then((response) => response.json())
      .then((result) => callback(result))
      .catch((error) => console.log("error", error));
  };
}
