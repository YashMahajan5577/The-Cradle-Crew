import React, { useRef, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";

import RegisteredSuccessfully from "../Utils/registered";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box } from "@mui/material";

import { uniqueNamesGenerator, Config, names } from "unique-names-generator";
import { NumberDictionary } from "unique-names-generator";
import Api from "../../routes/api";

const uuid = require("uuid");

export default function Parents(props) {
  const username = useRef();
  const password = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const contactInfo = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const address = useRef();
  const state = useRef();
  const city = useRef();
  const pinCode = useRef();
  const building = useRef();
  const kids_info = useRef();
  const identity_photo = useRef();
  const identity_number = useRef();
  const [details, setDetails] = useState();

  const [childArray, setChildArray] = useState([]);

  const inputFieldStyle = {
    width: "100%",
    marginTop: "5px",
    marginBottom: "5px",
  };

  const inputFieldStyle2 = {
    width: "100%",
    marginTop: "5px",
    marginBottom: "5px",
  };

  const config = {
    dictionaries: [names],
  };

  const navigate = useNavigate();

  useEffect(() => {
    Api.getUserDetails(localStorage.getItem("user"), (response) => {
      if (response.data.auth) {
        setDetails(response.data.data[0]);

        const data = response.data.data[0];

        username.current.value = data.username;
        password.current.value = data.password;
        firstName.current.value = data.first_name;
        lastName.current.value = data.last_name;
        contactInfo.current.value = data.contact_info;
        email.current.value = data.email;
        phoneNumber.current.value = data.phone;
        address.current.value = data.address;
        state.current.value = data.state;
        city.current.value = data.city;
        pinCode.current.value = data.pin_code;
        building.current.value = data.building;
        kids_info.current.value = data.kids_info;
        identity_photo.current.value = data.identity_photo;
        identity_number.current.value = data.identity_number;
        setChildArray(data.kids_array);
      } else {
        // alert("Something went wrong");
      }
    });

    username.current.value = "johndoe123";
    password.current.value = "johndoe123";
    firstName.current.value = "John";
    lastName.current.value = "Doe";
    contactInfo.current.value = "some contact information";
    email.current.value = "johndoe123@email.com";
    phoneNumber.current.value = "0123456789";
    address.current.value = "some fake address";
    state.current.value = "some state";
    city.current.value = "some fake city";
    pinCode.current.value = "416001";
    building.current.value = "Building Name";
    kids_info.current.value = "I have so many kids, please take care of them";
    identity_photo.current.value =
      "https://randomuser.me/api/portraits/men/61.jpg";
    identity_number.current.value = "0123456789";
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    Api.registerParent(
      {
        username: username.current.value,
        password: password.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        contact_info: contactInfo.current.value,
        email: email.current.value,
        phone: phoneNumber.current.value,
        address: address.current.value,
        state: state.current.value,
        city: city.current.value,
        pin_code: pinCode.current.value,
        building: building.current.value,
        kids_info: kids_info.current.value,
        kids_array: childArray,
        profile_photo: identity_photo.current.value,
        identity_photo: identity_photo.current.value,
        identity_number: identity_number.current.value,
      },
      (response) => {
        if (response.data.status) {
          alert(response.data.message);

          navigate("/");
        } else {
          alert(response.data.message);
        }

        // if (response.data.status === "success") {
        //   // navigate("/dashboard/parents");
        // } else {
        //   alert(response.data.err);
        // }
      }
    );
  };

  function getTodayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    return yyyy + "-" + mm + "-" + dd;
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto my-20 ">
      <Box
        component="form"
        onSubmit={(e) => {
          if (window.localStorage.getItem("update")) {
            e.preventDefault();

            Api.editProfile(
              {
                username: username.current.value,
                password: password.current.value,
                first_name: firstName.current.value,
                last_name: lastName.current.value,
                contact_info: contactInfo.current.value,
                email: email.current.value,
                phone: phoneNumber.current.value,
                address: address.current.value,
                state: state.current.value,
                city: city.current.value,
                pin_code: pinCode.current.value,
                building: building.current.value,
                kids_info: kids_info.current.value,
                kids_array: childArray,
                profile_photo: identity_photo.current.value,
                identity_photo: identity_photo.current.value,
                identity_number: identity_number.current.value,
                type: "PARENT",
              },
              (response) => {
                if (response.data.status) {
                  alert(response.data.message);

                  localStorage.clear();
                  sessionStorage.clear();

                  document.cookie =
                    "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                  navigate("/", { replace: true });
                } else {
                  alert(response.data.message);
                }

                // if (response.data.status === "success") {
                //   // navigate("/dashboard/parents");
                // } else {
                //   alert(response.data.err);
                // }
              }
            );
          } else {
            handleOnSubmit(e);
          }
        }}
      >
        <div className="flex justify-between mb-20 ">
          <h1 className="text-4xl font-semibold">
            {" "}
            {window.localStorage.getItem("update")
              ? "Update Your Profile"
              : "Parent Registration"}
          </h1>
          <div className="space-x-5 flex">
            {window.localStorage.getItem("update") && (
              <div
                onClick={() => {
                  Api.deleteProfile(username.current.value, (response) => {
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
                }}
                className="border-pink-600 cursor-pointer py-2 rounded text-pink-500 px-3 border"
              >
                Delete Profile
              </div>
            )}
            <button
              type="submit"
              className="bg-pink-600 py-2 rounded text-white px-3 hover:bg-pink-700 hover:shadow-xl shadow-pink-500"
            >
              {window.localStorage.getItem("update")
                ? "Update Profile"
                : "Submit Request"}
            </button>
          </div>
        </div>
        <table className="w-full">
          <tbody className="parent-dialog-form">
            <tr
              style={{
                display: window.localStorage.getItem("update") ? "none" : "",
              }}
            >
              <td>Username</td>
              <td>
                <TextField
                  inputRef={username}
                  required
                  sx={inputFieldStyle}
                  label="Username"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr
              style={{
                display: window.localStorage.getItem("update") ? "none" : "",
              }}
            >
              <td>Password</td>
              <td>
                <TextField
                  inputRef={password}
                  sx={inputFieldStyle}
                  label="Password"
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>Your Name</td>
              <td>
                <TextField
                  inputRef={firstName}
                  sx={{
                    width: "100%",
                    paddingRight: "20px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                  onChange={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^a-z]/gi,
                      ""
                    );
                  }}
                  label="First Name"
                  variant="outlined"
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  inputRef={lastName}
                  sx={inputFieldStyle}
                  label="Last Name"
                  variant="outlined"
                  onChange={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^a-z]/gi,
                      ""
                    );
                  }}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>Contact Info</td>

              <td>
                <TextField
                  inputRef={contactInfo}
                  sx={inputFieldStyle}
                  label="Contact Information"
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>Email address</td>
              <td>
                <TextField
                  inputRef={email}
                  sx={inputFieldStyle}
                  label="Email"
                  required
                  type="email"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>Phone number</td>
              <td>
                <TextField
                  inputRef={phoneNumber}
                  sx={inputFieldStyle}
                  label="Phone"
                  onChange={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/gi,
                      ""
                    );
                  }}
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>Address</td>
              <td>
                <TextField
                  inputRef={address}
                  multiline
                  required
                  sx={inputFieldStyle}
                  label="Enter address"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  rows={4}
                />
              </td>
            </tr>
            <tr>
              <td>State</td>
              <td>
                <TextField
                  inputRef={state}
                  sx={inputFieldStyle}
                  label="State"
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>City</td>
              <td>
                <TextField
                  inputRef={city}
                  sx={inputFieldStyle}
                  required
                  label="City"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>Pincode</td>
              <td>
                <TextField
                  inputRef={pinCode}
                  required
                  sx={inputFieldStyle}
                  onChange={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/gi,
                      ""
                    );
                  }}
                  label="Pin Code"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>Building/Area</td>
              <td>
                <TextField
                  inputRef={building}
                  sx={inputFieldStyle}
                  label="Building/Area"
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>Identity Photo (KYC)</td>
              <td>
                <TextField
                  inputRef={identity_photo}
                  sx={inputFieldStyle}
                  required
                  label="Building/Area"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>Identity Number (KYC)</td>
              <td>
                <TextField
                  inputRef={identity_number}
                  sx={inputFieldStyle}
                  label="Building/Area"
                  required
                  onChange={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/gi,
                      ""
                    );
                  }}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>Kids Info</td>
              <td>
                <TextField
                  inputRef={kids_info}
                  sx={inputFieldStyle}
                  label="kids Information"
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>

            <tr>
              <td className="w-full font-bold leading-none">Kids to Enroll</td>
              <td className="pt-10 pb-5">
                <div
                  onClick={() => {
                    const newRecord = {
                      id: uuid.v4(),
                      firstName: uniqueNamesGenerator(config),
                      dob: `${NumberDictionary.generate({
                        min: 2015,
                        max: 2021,
                      })}-${NumberDictionary.generate({
                        min: 10,
                        max: 12,
                      })}-${NumberDictionary.generate({
                        min: 10,
                        max: 30,
                      })}`,
                      age: NumberDictionary.generate({ min: 1, max: 7 })[0],
                    };
                    setChildArray([...childArray, newRecord]);
                  }}
                  className="border px-4 py-2 bg-gray-600 text-white shadow-lg cursor-pointer active:shadow text-sm rounded-full flex items-center "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    height="512"
                    className="w-5 h-5 mr-2 fill-white"
                    viewBox="0 0 24 24"
                    width="512"
                    data-name="Layer 1"
                  >
                    <path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1 -10 10zm5-10a1 1 0 0 1 -1 1h-3v3a1 1 0 0 1 -2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 1 1z" />
                  </svg>
                  Add new
                </div>
              </td>
            </tr>

            {childArray.map((child, key) => (
              <tr key={key}>
                <td>{key + 1}</td>

                <td>
                  <div className="flex w-full space-x-5">
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      sx={inputFieldStyle2}
                      required
                      placeholder="Jr John Doe"
                      value={child.firstName}
                      onChange={(e) => {
                        setChildArray(
                          childArray.map((obj) => {
                            if (obj.id === child.id) {
                              return {
                                id: child.id,
                                firstName: e.currentTarget.value,
                                dob: child.dob,
                                age: child.age,
                              };
                            }

                            // 👇️ otherwise return object as is
                            return obj;
                          })
                        );
                      }}
                      label="Name"
                      variant="outlined"
                    />
                    <TextField
                      sx={inputFieldStyle2}
                      label="Date of birth"
                      required
                      type={"date"}
                      defaultValue={"12-03-2000"}
                      onChange={(e) => {
                        setChildArray(
                          childArray.map((obj) => {
                            if (obj.id === child.id) {
                              return {
                                id: child.id,
                                firstName: child.firstName,
                                dob: e.currentTarget.value,
                                age: child.age,
                              };
                            }

                            // 👇️ otherwise return object as is
                            return obj;
                          })
                        );
                      }}
                      placeholder="DD/MM/YYYY"
                      InputProps={{ inputProps: { max: getTodayDate() } }}
                      InputLabelProps={{ shrink: true }}
                      value={child.dob}
                      variant="outlined"
                    />
                    <TextField
                      sx={inputFieldStyle2}
                      label="Age"
                      required
                      onChange={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /[^0-9]/gi,
                          ""
                        );
                        setChildArray(
                          childArray.map((obj) => {
                            if (obj.id === child.id) {
                              return {
                                id: child.id,
                                firstName: child.firstName,
                                dob: child.dob,
                                age: e.currentTarget.value,
                              };
                            }

                            // 👇️ otherwise return object as is
                            return obj;
                          })
                        );
                      }}
                      placeholder="1-6"
                      InputLabelProps={{ shrink: true }}
                      value={child.age}
                      variant="outlined"
                    />

                    <DeleteForeverIcon
                      onClick={() => {
                        setChildArray(
                          childArray.filter((item) => item.id !== child.id)
                        );
                        // let array = childArray;
                        // array.splice(key, 1);

                        // setChildArray(array);
                      }}
                      sx={{
                        marginTop: "auto",
                        marginBottom: "auto",
                        "&:hover": {
                          fill: "red",
                        },
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </div>
  );
}
