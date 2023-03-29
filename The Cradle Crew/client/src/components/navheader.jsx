import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const NavHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(localStorage.getItem("user"), localStorage.getItem("type"));
  }, []);

  return (
    <div className="w-full h-20 shadow-md bg-white">
      <div className="w-full h-full max-w-screen-xl mx-auto flex items-center justify-between">
        {/*  */}
        <div className="flex items-center space-x-5">
          <div
            onClick={() => {
              navigate("/explore", { replace: false });
            }}
            className="text-btn uppercase"
          >
            Explore
          </div>

          {localStorage.getItem("user") && (
            <div
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();

                document.cookie =
                  "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                navigate("/", { replace: true });
              }}
              className="text-btn uppercase"
            >
              Logout
            </div>
          )}

          {/* {!location.pathname.includes("login") &&
            !location.pathname.includes("/signup") &&
            !localStorage.getItem("user") && (
              <div className="space-x-3 flex items-center">
                <span className="text-btn">
                  <Link to="/login">Login</Link>
                </span>
                <span>|</span>
                <span className="text-btn">
                  <Link to="/signup">Register</Link>
                </span>
              </div>
            )} */}
        </div>

        <ul className="flex space-x-5">
          <li className="text-btn uppercase">
            <Link to="/about">About</Link>
          </li>
          <li className="text-btn uppercase">
            <Link to="/why-us">Why Us</Link>
          </li>
          <li className="text-btn uppercase">
            <Link to="/contact">Contact</Link>
          </li>
          {/* {localStorage.getItem("user") && (
            <>
              <Link
                className="text-btn uppercase"
                to={
                  window.localStorage.getItem("type") === "BABYSITTER"
                    ? "/dashboard/babysitter"
                    : window.localStorage.getItem("type") === "CRECHE"
                    ? "/dashboard/creche"
                    : window.localStorage.getItem("type") === "PARENT"
                    ? "/dashboard/parent"
                    : "/"
                }
              >
                Profile
              </Link>
            </>
          )} */}
        </ul>
      </div>
    </div>
  );
};

export default NavHeader;
