import Axios from "axios";

const useAuth = (callback) => {
  Axios.defaults.withCredentials = true;

  // not in use
  Axios.get("http://localhost:3001/api/userAuth", {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  }).then(callback);
};

export default useAuth;
