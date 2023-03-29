import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import ReactGoogleMaps from "../../components/ReactGoogleMaps";
import Api from "../../routes/api";

export default function Creche() {
  const username = useRef();
  const password = useRef();
  const director_name = useRef();
  const creche_name = useRef();
  // const profile_photo = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const address = useRef();
  const state = useRef();
  const city = useRef();
  const pinCode = useRef();
  const building = useRef();
  const pricing = useRef();
  const activities = useRef();
  const services_offered = useRef();
  const special_features = useRef();
  const gallery_photos = useRef();
  const [lat, setLat] = useState(-34.397);
  const [long, setLong] = useState(150.644);
  const capacity = useRef();
  const identity_number = useRef();
  const identity_photo = useRef();
  const daycare_license_number_kyc = useRef();
  const daycare_license_photo_kyc = useRef();

  const [mapZoom, setMapZoom] = useState(2);

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
        director_name.current.value = data.director_name;
        creche_name.current.value = data.creche_name;
        email.current.value = data.email;
        phoneNumber.current.value = data.phone;
        address.current.value = data.address;
        state.current.value = data.state;
        city.current.value = data.city;
        pinCode.current.value = data.pin_code;
        building.current.value = data.building;
        pricing.current.value = data.pricing;
        activities.current.value = data.activities;
        services_offered.current.value = data.services_offered;
        special_features.current.value = data.special_features;
        gallery_photos.current.value = data.gallery_photos;
        capacity.current.value = data.capacity;
        identity_number.current.value = data.identity_number;
        identity_photo.current.value = data.identity_photo;
        daycare_license_number_kyc.current.value =
          data.daycare_license_number_kyc;
        daycare_license_photo_kyc.current.value =
          data.daycare_license_photo_kyc;
      } else {
        // alert("Something went wrong");
      }
    });

    username.current.value = "johndoe123";
    password.current.value = "johndoe123";
    director_name.current.value = "John";
    creche_name.current.value = "Doe";
    email.current.value = "johndoe123@email.com";
    phoneNumber.current.value = "0123456789";
    address.current.value = "some fake address";
    state.current.value = "some state";
    city.current.value = "some fake city";
    pinCode.current.value = "416001";
    building.current.value = "Fake Building";
    pricing.current.value = "750";
    activities.current.value = "some activity";
    services_offered.current.value = "some service";
    special_features.current.value = "some special feature";
    gallery_photos.current.value = "some gallery_photos";
    capacity.current.value = "11";
    identity_number.current.value = "23145";
    identity_photo.current.value =
      "https://randomuser.me/api/portraits/men/61.jpg";

    daycare_license_number_kyc.current.value = "909323";
    daycare_license_photo_kyc.current.value =
      "https://randomuser.me/api/portraits/men/61.jpg";
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        setMapZoom(15);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    Api.registerCreche(
      {
        username: username.current.value,
        password: password.current.value,
        director_name: director_name.current.value,
        creche_name: creche_name.current.value,
        profile_photo: identity_photo.current.value,
        email: email.current.value,
        phone: phoneNumber.current.value,
        address: address.current.value,
        state: state.current.value,
        city: city.current.value,
        pin_code: pinCode.current.value,
        building: building.current.value,
        pricing: pricing.current.value,
        activities: activities.current.value,
        services_offered: services_offered.current.value,
        special_features: special_features.current.value,
        gallery_photos: [
          "https://static.toiimg.com/thumb/msid-61329044,width-400,resizemode-4/61329044.jpg",
          "https://image.shutterstock.com/image-photo/little-children-girl-boy-molding-260nw-1351172495.jpg",
          "https://thumbs.dreamstime.com/b/young-african-kids-small-creche-daycare-preschool-johannesburg-south-africa-june-181063838.jpg",
          "https://i.pinimg.com/originals/53/3f/96/533f960e877785d5ce92aaceb1aad008.jpg",
        ],
        lat: lat,
        long: long,
        capacity: capacity.current.value,
        identity_number: identity_number.current.value,
        identity_photo: identity_photo.current.value,
        daycare_license_number_kyc: daycare_license_number_kyc.current.value,
        daycare_license_photo_kyc: daycare_license_photo_kyc.current.value,
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
                director_name: director_name.current.value,
                creche_name: creche_name.current.value,
                profile_photo: identity_photo.current.value,
                email: email.current.value,
                phone: phoneNumber.current.value,
                address: address.current.value,
                state: state.current.value,
                city: city.current.value,
                pin_code: pinCode.current.value,
                building: building.current.value,
                pricing: pricing.current.value,
                activities: activities.current.value,
                services_offered: services_offered.current.value,
                special_features: special_features.current.value,
                gallery_photos: [
                  "https://static.toiimg.com/thumb/msid-61329044,width-400,resizemode-4/61329044.jpg",
                  "https://image.shutterstock.com/image-photo/little-children-girl-boy-molding-260nw-1351172495.jpg",
                  "https://thumbs.dreamstime.com/b/young-african-kids-small-creche-daycare-preschool-johannesburg-south-africa-june-181063838.jpg",
                  "https://i.pinimg.com/originals/53/3f/96/533f960e877785d5ce92aaceb1aad008.jpg",
                ],
                lat: lat,
                long: long,
                capacity: capacity.current.value,
                identity_number: identity_number.current.value,
                identity_photo: identity_photo.current.value,
                daycare_license_number_kyc:
                  daycare_license_number_kyc.current.value,
                daycare_license_photo_kyc:
                  daycare_license_photo_kyc.current.value,
                type: "CRECHE",
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
              : "Creche Registration"}
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
                  label="Password"
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>Organization</td>
              <td>
                <TextField
                  inputRef={director_name}
                  sx={{
                    width: "100%",
                    paddingRight: "20px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                  id="outlined-basic"
                  label="Director Name"
                  onChange={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^a-z]/gi,
                      ""
                    );
                  }}
                  variant="outlined"
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  inputRef={creche_name}
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  required
                  label="Creche Name"
                  onChange={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^a-z]/gi,
                      ""
                    );
                  }}
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
                  type="email"
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  label="Email"
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
                  label="State"
                  variant="outlined"
                  required
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
                  variant="outlined"
                  required
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
                  variant="outlined"
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>Building</td>
              <td>
                <TextField
                  inputRef={building}
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  label="Building/Area"
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
                  type="number"
                  onChange={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/gi,
                      ""
                    );
                  }}
                  id="outlined-basic"
                  label="Pricing (per/hr)"
                  required
                  variant="outlined"
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
                  variant="outlined"
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr
              style={{
                display: window.localStorage.getItem("update") ? "none" : "",
              }}
            >
              <td>Gallery Photos</td>
              <td>
                <TextField
                  inputRef={gallery_photos}
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  required
                  label="Gallery Photos"
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
              <td className="!align-text-top">Location</td>
              <td className="flex flex-col">
                <div className="flex items-center">
                  <TextField
                    value={lat}
                    sx={{
                      width: "100%",
                      paddingRight: "20px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    id="outlined-basic"
                    label="Latitude"
                    required
                    aria-readonly
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    value={long}
                    sx={inputFieldStyle}
                    id="outlined-basic"
                    required
                    aria-readonly
                    label="Longitude"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <div
                    onClick={getCurrentLocation}
                    className="whitespace-nowrap cursor-pointer shadow-lg active:shadow flex items-center  font-light mx-5 border rounded-full bg-gray-600 h-full text-white px-4 py-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Outline"
                      className="w-4 h-4 fill-white mr-2"
                      viewBox="0 0 24 24"
                      width="512"
                      height="512"
                    >
                      <path d="M12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z" />
                      <path d="M12,24a5.271,5.271,0,0,1-4.311-2.2c-3.811-5.257-5.744-9.209-5.744-11.747a10.055,10.055,0,0,1,20.11,0c0,2.538-1.933,6.49-5.744,11.747A5.271,5.271,0,0,1,12,24ZM12,2.181a7.883,7.883,0,0,0-7.874,7.874c0,2.01,1.893,5.727,5.329,10.466a3.145,3.145,0,0,0,5.09,0c3.436-4.739,5.329-8.456,5.329-10.466A7.883,7.883,0,0,0,12,2.181Z" />
                    </svg>{" "}
                    Current Location
                  </div>
                </div>

                <div className="h-96 w-full rounded overflow-hidden">
                  <ReactGoogleMaps
                    lat={lat}
                    long={long}
                    mapZoom={mapZoom}
                    click={(pos) => {
                      setLat(pos.lat);
                      setLong(pos.lng);
                    }}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>Capacity</td>
              <td>
                <TextField
                  inputRef={capacity}
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  required
                  onChange={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/gi,
                      ""
                    );
                  }}
                  type="number"
                  label="Capacity"
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
                  required
                  onChange={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/gi,
                      ""
                    );
                  }}
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
                  label="Identity Photo (KYC)"
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </td>
            </tr>
            <tr>
              <td>License Number (KYC)</td>
              <td>
                <TextField
                  inputRef={daycare_license_number_kyc}
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  label="License Number"
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
              <td>License Photo (KYC)</td>
              <td>
                <TextField
                  inputRef={daycare_license_photo_kyc}
                  sx={inputFieldStyle}
                  id="outlined-basic"
                  label="License Photo"
                  required
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
