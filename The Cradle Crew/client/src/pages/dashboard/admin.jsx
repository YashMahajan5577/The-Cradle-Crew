import React, { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import Api from "../../routes/api";
import { useNavigate } from "react-router-dom";
const CardView = (props) => {
  const data = props.data.data[0];
  const navigate = useNavigate();

  const DataCol = (props) => {
    if (props.value) {
      return (
        <tr>
          <td className="text-gray-800 font-light">{props.k}</td>
          <td className="px-10 text-gray-400">:</td>
          <td className={props.className}>{props.value}</td>
        </tr>
      );
    } else {
      return <></>;
    }
  };

  const declineRequest = (username) => {
    Api.adminDeclineRequest(
      {
        username,
        action: "0",
      },
      (response) => {
        console.log(response.data);
        if (response.data.auth) {
          window.location.reload();
        } else {
          alert("Error occurred: " + response.data.message);
        }
      }
    );
  };

  const deleteUser = (username) => {
    Api.deleteProfile(username, (response) => {
      console.log(response);

      if (response.status) {
        alert(response.message);

        localStorage.clear();
        sessionStorage.clear();

        document.cookie =
          "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        navigate("/", { replace: true });
      } else {
        alert("something went wrong.");
      }
    });
  };

  const acceptRequest = (username) => {
    Api.adminAcceptRequest(
      {
        username,
        action: "1",
      },
      (response) => {
        console.log(response.data);
        if (response.data.auth) {
          window.location.reload();
        } else {
          alert("Error occurred: " + response.data.message);
        }
      }
    );
  };

  return (
    <>
      <div className="w-full h-fit bg-white rounded-xl border p-5 flex justify-between ">
        <table>
          <tbody>
            <DataCol
              k={"User Type"}
              className="font-bold"
              value={props.data.type}
            />
            <DataCol k={"User Name"} value={data.username} />
            <DataCol k={"First Name"} value={data.first_name} />
            <DataCol k={"Last Name"} value={data.last_name} />
            <DataCol k={"Director Name"} value={data.director_name} />
            <DataCol k={"Creche Name"} value={data.creche_name} />
            <DataCol k={"Email Address"} value={data.email} />
            <DataCol k={"Phone Number"} value={data.phone} />
            <DataCol k={"Address"} value={data.address} />
            <DataCol k={"State"} value={data.state} />
            <DataCol k={"City"} value={data.city} />
            <DataCol k={"Pin Code"} value={data.pin_code} />
            <DataCol k={"Building"} value={data.building} />
            <DataCol k={"Contact Information"} value={data.contact_info} />
            <DataCol k={"Pricing"} value={data.pricing} />
            <DataCol k={"Capacity"} value={data.capacity} />
            <DataCol k={"Kids Information"} value={data.kids_info} />
            <DataCol k={"Identity Number"} value={data.identity_number} />
            <DataCol k={"Identity Photo"} value={data.identity_photo} />
            <DataCol k={"About"} value={data.about_yourself} />
            <DataCol
              k={"License Number"}
              value={data.daycare_license_number_kyc}
            />
            <DataCol
              k={"License Photo"}
              value={data.daycare_license_photo_kyc}
            />
          </tbody>
        </table>

        <div className="flex flex-col items-center justify-between min-h-full">
          <div>
            <img
              className="object-cover w-32 h-32 border rounded-full "
              src={data.profile_photo}
              alt=""
            />
          </div>
          <div className="mt-auto space-x-2 ">
            <button
              onClick={() => declineRequest(data.username)}
              className="border border-red-400 rounded-lg px-5 py-2 hover:bg-red-400 hover:text-white transition-all duration-150 text-red-500"
            >
              Remove
            </button>
            <button
              onClick={() => acceptRequest(data.username)}
              className="bg-green-600 hover:shadow-lg active:bg-green-700 rounded-lg px-10 py-2 transition-all duration-150 text-white"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [feedbackView, setFeedbackView] = useState(false);
  const [userListView, setUserListView] = useState(true);
  const [parentRequests, setParentRequests] = useState(0);
  const [crecheRequests, setCrecheRequests] = useState(0);
  const [babysitterRequests, setBabysitterRequests] = useState(0);
  const [feedbackData, setFeedbackData] = useState([]);

  const [allUsers, setAllUsers] = useState();

  let c1 = 0;
  let c2 = 0;
  let c3 = 0;

  useEffect(() => {
    Api.getFeedbacks((response) => {
      if (response.data.auth) {
        setFeedbackData(response.data.message);
      } else {
        // something went wrong
      }
    });

    Api.getUserList((response) => {
      if (response.data.status) {
        setAllUsers(response.data.result);
      } else {
        console.log("something went wrong.");
      }
    });

    Api.adminGetUserList((response) => {
      setData(response.data.result);

      response.data.result?.map((item) => {
        console.log(item.type);
        switch (item.type) {
          case "BABYSITTER": {
            c1++;
            break;
          }
          case "PARENT": {
            c2++;
            break;
          }
          case "CRECHE": {
            c3++;
            break;
          }
        }
      });

      setTimeout(() => {
        setBabysitterRequests(c1);
        setParentRequests(c2);
        setCrecheRequests(c3);
      }, 999);
    });
  }, []);

  const FeedbackView = (props) => {
    const data = props.data;
    return (
      <div className="w-full space-y-4">
        <h2 className="text-4xl font-bold mb-10 mt-5 pl-5 text-gray-700">
          Feedbacks
        </h2>
        {data?.map((item, key) => {
          return (
            <div className="flex rounded-xl flex-col border  px-5 py-10">
              <div className="flex items-center">
                <div className="p-4 mr-4 bg-pink-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="Capa_1"
                    className="w-6 h-6 fill-pink-900"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                    width="512"
                    height="512"
                  >
                    <g>
                      <circle cx="256" cy="128" r="128" />
                      <path d="M256,298.667c-105.99,0.118-191.882,86.01-192,192C64,502.449,73.551,512,85.333,512h341.333   c11.782,0,21.333-9.551,21.333-21.333C447.882,384.677,361.99,298.784,256,298.667z" />
                    </g>
                  </svg>
                </div>
                <div className="flex justify-center flex-col mt-2">
                  <span className="text-2xl font-bold">{item.name}</span>
                  <span className="text-gray-500 font-light">{item.email}</span>
                </div>
              </div>
              <span className="ml-4 mt-2">
                {"″"}
                {item.message}
                {"″"}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const UsersList = (prop) => {
    const data = prop.data.data[0].data[0];

    console.log(data);
    return (
      <div className="w-full border rounded px-5 py-5 flex my-3">
        <div className="flex mr-4 space-x-8 w-full">
          <img
            className="w-20 h-20 rounded-full"
            src={data.profile_photo}
            alt=""
          />
          <div className="">
            <div className="flex font-bold text-xl">
              <p>{data.first_name}</p>
              <p>{data.last_name}</p>
              <p>{data.director_name}</p>
            </div>
            <div className="flex flex-col text-sm">
              <span className="mb-2">{data.email}</span>
              <span>{data.address}</span>
              <span>
                {data.city} | {data.pin_code}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-auto cursor-pointer">
          <div
            onClick={() => {
              Api.deleteProfile(data.username, (response) => {
                if (response.status) {
                  window.location.reload();
                } else {
                  alert("something went wrong.");
                }
              });
            }}
            className="px-5 py-2 bg-red-500 rounded text-white whitespace-nowrap"
          >
            Delete User
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="w-full max-w-screen-xl mx-auto mt-20 space-y-10 py-20">
        <div className="w-full flex">
          <div className="w-full flex space-x-10 mb-20">
            <div className="border rounded-xl text-center flex flex-col w-52 py-8">
              <span className="text-8xl font-thin text-pink-300">
                {parentRequests}
              </span>
              <span className="text-xl font-semibold text-pink-700">
                Parent
              </span>
            </div>
            <div className="border rounded-xl text-center flex flex-col w-52 py-8">
              <span className="text-8xl font-thin text-pink-300">
                {crecheRequests}
              </span>
              <span className="text-xl font-semibold text-pink-700">
                Creche
              </span>
            </div>
            <div className="border rounded-xl text-center flex flex-col w-52   py-8">
              <span className="text-8xl font-thin text-pink-300">
                {babysitterRequests}
              </span>
              <span className="text-xl font-semibold text-pink-700">
                Babysitter
              </span>
            </div>
          </div>

          <div className="flex space-x-5">
            {allUsers && (
              <button
                onClick={() => {
                  setUserListView(!userListView);
                }}
                className="h-fit whitespace-nowrap bg-gray-100 px-4 py-2 rounded"
              >
                {userListView ? "Hide Users" : "Show Users"}
              </button>
            )}
            <button
              onClick={() => {
                setFeedbackView(!feedbackView);
              }}
              className="h-fit whitespace-nowrap bg-gray-100 px-4 py-2 rounded"
            >
              {feedbackView ? "View Requests" : "View Feedback"}
            </button>
          </div>
        </div>

        <div>
          {userListView && (
            <div>
              <h2 className="text-4xl font-bold mb-10 mt-5 pl-5 text-gray-700">
                {allUsers && "Users List"}
              </h2>
              {allUsers?.map((user, key) => (
                <UsersList data={user} key={key} />
              ))}
            </div>
          )}
        </div>

        {feedbackView ? (
          <FeedbackView data={feedbackData} />
        ) : (
          <>
            {" "}
            <div>
              <h2 className="text-4xl font-bold mb-10 mt-5 pl-5 text-gray-700">
                Registration Requests
              </h2>
              {data?.map((user, key) => (
                <CardView data={user} key={key} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
