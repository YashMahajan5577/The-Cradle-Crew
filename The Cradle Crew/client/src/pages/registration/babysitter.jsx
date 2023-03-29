import React, { useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import Api from "../../routes/api";

export default function Babysitter() {
  const username = useRef();
  const password = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const address = useRef();
  const state = useRef();
  const city = useRef();
  const pinCode = useRef();
  const pricing = useRef();
  const activities = useRef();
  const services_offered = useRef();
  const special_features = useRef();
  // const gallery_photos = useRef();
  const dob = useRef();
  const identity_number = useRef();
  const identity_photo = useRef();
  const about_yourself = useRef();

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

  const navigate = useNavigate();

  useEffect(() => {
    Api.getUserDetails(localStorage.getItem("user"), (response) => {
      if (response.data.auth) {
        // setDetails(response.data.data[0]);

        const data = response.data.data[0];

        username.current.value = data.username;
        password.current.value = data.password;
        firstName.current.value = data.first_name;
        lastName.current.value = data.last_name;
        // contactInfo.current.value = data.contact_info;
        email.current.value = data.email;
        phoneNumber.current.value = data.phone;
        address.current.value = data.address;
        state.current.value = data.state;
        city.current.value = data.city;
        pinCode.current.value = data.pin_code;
        pricing.current.value = data.pricing;
        activities.current.value = data.activities;
        services_offered.current.value = data.services_offered;
        special_features.current.value = data.special_features;
        // gallery_photos.current.value = "some gallery_photos ";
        dob.current.value = data.birth_date;
        identity_number.current.value = data.identity_number;
        identity_photo.current.value = data.identity_photo;

        about_yourself.current.value = data.about_yourself;
      } else {
        // alert("Something went wrong");
      }
    });

    username.current.value = "johndoe123";
    password.current.value = "johndoe123";
    firstName.current.value = "John";
    lastName.current.value = "Doe";
    email.current.value = "johndoe123@email.com";
    phoneNumber.current.value = "0123456789";
    // profile_photo.current.value = "some"
    address.current.value = "some fake address";
    state.current.value = "some state";
    city.current.value = "some fake city";
    pinCode.current.value = "416001";
    pricing.current.value = "750";
    activities.current.value = "some activity";
    services_offered.current.value = "some service";
    special_features.current.value = "some special feature";
    // gallery_photos.current.value = "some gallery_photos ";
    dob.current.value = "12/02/2001";
    identity_number.current.value = "123213";
    identity_photo.current.value =
      "https://randomuser.me/api/portraits/men/61.jpg";

    about_yourself.current.value = "some fake information about my self.";
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    Api.registerBabysitter(
      {
        username: username.current.value,
        password: password.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        phone: phoneNumber.current.value,
        profile_photo: identity_photo.current.value,
        address: address.current.value,
        state: state.current.value,
        city: city.current.value,
        pin_code: pinCode.current.value,
        pricing: pricing.current.value,
        activities: activities.current.value,
        services_offered: services_offered.current.value,
        special_features: special_features.current.value,
        birth_date: dob.current.value,
        identity_number: identity_number.current.value,
        identity_photo: identity_photo.current.value,
        about_yourself: about_yourself.current.value,
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

    // const data = new FormData(e.currentTarget);

    // console.log(data.get('username'));

    // console.log(form);

    // const email = data.get("email");
    // const password = data.get("password");
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
                email: email.current.value,
                phone: phoneNumber.current.value,
                profile_photo: identity_photo.current.value,
                address: address.current.value,
                state: state.current.value,
                city: city.current.value,
                pin_code: pinCode.current.value,
                pricing: pricing.current.value,
                activities: activities.current.value,
                services_offered: services_offered.current.value,
                special_features: special_features.current.value,
                birth_date: dob.current.value,
                identity_number: identity_number.current.value,
                identity_photo: identity_photo.current.value,
                about_yourself: about_yourself.current.value,
                type: "BABYSITTER",
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
            {window.localStorage.getItem("update")
              ? "Update Your Profile"
              : "Baby Sitter Registration"}
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
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  required
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
                  id="outlined-basic"
                  required
                  label="Password"
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
                  id="outlined-basic"
                  onChange={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^a-z]/gi,
                      ""
                    );
                  }}
                  required
                  label="First Name"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  inputRef={lastName}
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  onChange={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^a-z]/gi,
                      ""
                    );
                  }}
                  label="Last Name"
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
                  id="outlined-basic"
                  label="Email"
                  type={"email"}
                  required
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
                  id="outlined-basic"
                  label="Phone"
                  type={"number"}
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
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  label="Enter address"
                  required
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
                  id="outlined-basic"
                  required
                  label="State"
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
                  id="outlined-basic"
                  label="City"
                  required
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
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  label="Pin Code"
                  onChange={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/gi,
                      ""
                    );
                  }}
                  type="number"
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>

            <tr>
              <td>Pricing (rates/hr)</td>
              <td>
                <TextField
                  inputRef={pricing}
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  label="Pricing (per/hr)"
                  onChange={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/gi,
                      ""
                    );
                  }}
                  variant="outlined"
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>Activities</td>
              <td>
                <TextField
                  inputRef={activities}
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  label="Activities"
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>Services Offered</td>
              <td>
                <TextField
                  inputRef={services_offered}
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  label="Services Offered"
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>Special Features</td>
              <td>
                <TextField
                  inputRef={special_features}
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  label="Special Features"
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>Date of Birth</td>
              <td>
                <TextField
                  inputRef={dob}
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  InputProps={{ inputProps: { max: getTodayDate() } }}
                  type={"date"}
                  label="Date of birth"
                  required
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
                  id="outlined-basic"
                  type="number"
                  required
                  label="Id prof number (KYC)"
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
                  id="outlined-basic"
                  required
                  label="Identity Photo (KYC)"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>About Yourself</td>
              <td>
                <TextField
                  inputRef={about_yourself}
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  label="About Yourself"
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    </div>
  );
}
