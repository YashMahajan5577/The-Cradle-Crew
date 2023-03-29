import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import Api from "../../routes/api";

const mapContainerStyle = {
  height: "500px",
  width: "100%",
};

// const center = {
//   lat: 0,
//   lng: -180,
// };

const onLoad = () => {
  // console.log("marker: ", marker);
};

const center = {
  lat: 23.610184502164305,
  lng: 78.81679530005283,
};

const ParentDashboard = () => {
  const [details, setDetails] = useState();
  const [babySitterData, setBabySitterData] = useState([]);
  const [crecheData, setCrecheData] = useState([]);
  const [crecheDetails, setCrecheDetails] = useState(null);
  const username = localStorage.getItem("user");
  const [appointedBabysitter, setAppointedBabysitter] = useState();

  const navigate = useNavigate();

  function ReactGoogleMaps(prop) {
    const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: "AIzaSyDsuigXiNzMY1V8kGCaJcYC3glDcjZprSk", // ,
      // ...otherOptions
    });

    const renderMap = () => {
      // wrapping to a function is useful in case you want to access `window.google`
      // to eg. setup options or create latLng object, it won't be available otherwise
      // feel free to render directly if you don't need that
      // const onLoad = React.useCallback(function onLoad(mapInstance) {
      //   // do something with map Instance
      // });
      return (
        <GoogleMap
          id="marker-example"
          mapContainerStyle={mapContainerStyle}
          zoom={4}
          center={center}
          onClick={(data) => {
            console.log({ lat: data.latLng.lat(), lng: data.latLng.lng() });
          }}
        >
          {prop.data?.map((item) => {
            const data = item.data[0].data[0];
            return (
              <>
                <Marker
                  onLoad={onLoad}
                  label={data.creche_name}
                  onClick={(response) => {
                    console.log(response.latLng.lat());

                    Api.getCrecheDetails(
                      {
                        lat: response.latLng.lat(),
                        long: response.latLng.lng(),
                      },
                      (r) => {
                        if (r.data.auth)
                          setCrecheDetails(r.data.result.data[0].data[0]);
                        else alert("Error Occurred : " + r.data.message);
                      }
                    );
                  }}
                  position={{ lat: Number(data.lat), lng: Number(data.long) }}
                />
              </>
            );
          })}
        </GoogleMap>

        // <GoogleMap
        //   id="overlay-view-example"
        //   mapContainerStyle={mapContainerStyle}
        //   zoom={11}
        //   onClick={
        //       (response)=>{
        //           console.log(response.latLng.lat(), response.latLng.lng());
        //       }
        //   }
        //   center={center}
        // >
        //   <OverlayView
        //     position={center}
        //     mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        //   >
        //     <div style={divStyle}>
        //       <h1>OverlayView</h1>

        //       <button onClick={onClick} type="button">
        //         Click me
        //       </button>
        //     </div>
        //   </OverlayView>
        // </GoogleMap>
      );
    };

    if (loadError) {
      return <div>Map cannot be loaded right now, sorry.</div>;
    }

    return isLoaded ? renderMap() : <></>;
  }

  useEffect(() => {
    Api.getUserDetails(username, (response) => {
      if (response.data.auth) {
        setDetails(response.data.data[0]);
      } else {
        // alert("Something went wrong");
      }
    });

    Api.getAppointedBabysitter((response) => {
      console.log(response.data);
      if (response.data.status) {
        setAppointedBabysitter(response.data.message);
      } else {
        // alert("Something went wrong!");
      }
    });

    Api.getBabysitterList((response) => {
      if (response.data.auth) setBabySitterData(response.data.result);
      // else alert("Error Occurred: " + response.data.message);
    });

    Api.getCrecheList((response) => {
      if (response.data.auth) setCrecheData(response.data.result);
      // else alert("Error Occurred : " + response.data.message);
    });
  }, []);

  const CardView = (props) => {
    const data = props.data;

    const DataCol = (props) => {
      if (props.value) {
        return (
          <tr>
            <td className="text-gray-800 font-light">{props.k}</td>
            <td className="px-10 text-gray-400">:</td>
            <td>{props.value}</td>
          </tr>
        );
      } else {
        return <></>;
      }
    };

    return (
      <>
        <div className="w-full h-fit bg-white rounded-xl border p-5 flex justify-between ">
          <table>
            <tbody>
              <DataCol k={"User Name"} value={data.username} />
              <DataCol k={"Password"} value={"**********"} />
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
              {data.kids_array && (
                <tr>
                  <td className="pt-3">Children</td>
                </tr>
              )}

              {data.kids_array?.map((value, key) => (
                <tr>
                  <td className="text-gray-800 font-light align-top pt-2">
                    {key + 1}.
                  </td>
                  <td className="px-10 text-gray-400 align-top pt-2">:</td>
                  <td key={key} className="space-y-2 pt-2">
                    <table>
                      <tbody className="text-sm">
                        <tr>
                          <td className="text-gray-800 font-light">Name</td>
                          <td className="px-10 text-gray-400">:</td>
                          <td>{value.firstName}</td>
                        </tr>
                        {/* <tr>
                          <td className="text-gray-800 font-light">
                            Last Name
                          </td>
                          <td className="px-10 text-gray-400">:</td>
                          <td>{value.lastName}</td>
                        </tr> */}
                        <tr>
                          <td className="text-gray-800 font-light">
                            Birth date:
                          </td>
                          <td className="px-10 text-gray-400">:</td>
                          <td>{value.dob}</td>
                        </tr>
                        <tr>
                          <td className="text-gray-800 font-light">Age</td>
                          <td className="px-10 text-gray-400">:</td>
                          <td>{value.age}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col items-center">
            <img
              className="object-cover w-32 h-32 border rounded-full "
              src={data.profile_photo}
              alt=""
            />

            <button onClick={() =>{
              window.localStorage.setItem("update", "PARENT")
              navigate("/reg/parent")
            }} className="mt-4 hover:text-pink-500">Edit profile</button>
          </div>
        </div>
      </>
    );
  };

  const BabysittersCardView = (prop) => {
    const data = prop.data;

    return (
      <div className="py-3">
        <div className="w-full h-fit bg-gray-100 rounded-xl flex items-center py-4">
          <div className="px-3">
            <img
              className="w-20 rounded-full"
              src={data.profile_photo}
              alt=""
            />
          </div>
          <div className="border-l-2 px-4 h-full w-full">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-xl font-semibold">
                {data.first_name} {data.last_name}
              </h2>
              <div className="flex items-center font-light text-sm space-x-3">
                <p>{data.phone}</p>
                <p>|</p>
                <p>{data.email}</p>
              </div>
            </div>
            <div className="text-sm flex items-center space-x-3">
              <p>₹{data.pricing}/hr</p>
              <p>
                {data.city}, {data.pin_code}
              </p>
            </div>
            <div className="mt-2">
              {data.about_yourself}
              <div className="flex justify-between">
                <div className="space-x-1 flex text-sm">
                  {data.services_offered}
                  {/* {data.services_offered?.map((item) => (
                    <div className="px-2 py-1 rounded text-white font-light text-xs bg-gray-600">
                      {item}
                    </div>
                  ))} */}
                </div>
                <div>
                  <button
                    onClick={() => {
                      window.localStorage.setItem("id", data.username);
                      window.localStorage.removeItem("t34", false);
                      navigate("/checkout");
                    }}
                    className="bg-white border py-1 hover:bg-pink-400 transition-all duration-200 hover:text-white text-sm text-pink-500 border-pink-500 px-5 rounded-full"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AppointedBabysitter = (props) => {
    const data = props.data.babysitter;
    const details = props.data.details;

    console.log(props.data);
    return (
      <div className="py-3">
        <div className="w-full h-fit bg-gray-100 rounded-xl flex items-center py-4">
          <div className="px-3">
            <img
              className="w-20 rounded-full"
              src={data.profile_photo}
              alt=""
            />
          </div>
          <div className="border-l-2 px-4 h-full w-full">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-xl font-semibold">
                {data.first_name} {data.last_name} {data.creche_name}
              </h2>
              <div className="flex items-center font-light text-sm space-x-3">
                <p>{data.phone}</p>
                <p>|</p>
                <p>{data.email}</p>
              </div>
            </div>
            <div className="text-sm flex items-center space-x-3">
              <p>₹{data.pricing}/hr</p>
              <p>
                {data.city}, {data.pin_code}
              </p>
            </div>
            <div className="mt-2">
              {data.about_yourself} {data.special_features}
              <div className="flex justify-between">
                <div className="space-x-1 flex text-sm">
                  {(function () {
                    try {
                      return data.services_offered?.map((item) => (
                        <div className="px-2 py-1.5 rounded text-white font-light text-xs bg-gray-600">
                          {item}
                        </div>
                      ));
                    } catch (err) {
                      return (
                        <div className="px-2 py-1.5 rounded text-white font-light text-xs bg-gray-600">
                          {data.services_offered}
                        </div>
                      );
                    }
                  })()}
                </div>
                <div>
                  {details.accepted ? (
                    <div className="flex items-center space-x-5">
                      <div className="border rounded cursor-pointer text-sm flex items-center">
                        <span className="bg-green-500 text-white py-1 pl-2 pr-2 rounded-l">
                          Accepted
                        </span>
                        <div
                          onClick={() => {
                            navigator.clipboard.writeText(
                              String(details.meetingLink)
                            );
                            // Alert the copied text
                            alert("Link copied successfully");
                          }}
                          className="bg-white py-1 fill-gray-500 font-semibold text-gray-500 pr-5 pl-5 flex items-center space-x-1 rounded-r"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            height="512"
                            viewBox="0 0 24 24"
                            width="512"
                          >
                            <path d="m13 20a5.006 5.006 0 0 0 5-5v-8.757a3.972 3.972 0 0 0 -1.172-2.829l-2.242-2.242a3.972 3.972 0 0 0 -2.829-1.172h-4.757a5.006 5.006 0 0 0 -5 5v10a5.006 5.006 0 0 0 5 5zm-9-5v-10a3 3 0 0 1 3-3s4.919.014 5 .024v1.976a2 2 0 0 0 2 2h1.976c.01.081.024 9 .024 9a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3-3zm18-7v11a5.006 5.006 0 0 1 -5 5h-9a1 1 0 0 1 0-2h9a3 3 0 0 0 3-3v-11a1 1 0 0 1 2 0z" />
                          </svg>
                          <span>Copy Url</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="border px-4 py-1 rounded bg-white text-sm font-semibold text-yellow-500 uppercase">
                        Pending
                      </div>
                    </>
                  )}

                  {/* <button onClick={() => {
                    window.localStorage.setItem('id', data.username)
                    navigate('/checkout')
                  }} className="bg-white border py-1 hover:bg-pink-400 transition-all duration-200 hover:text-white text-sm text-pink-500 border-pink-500 px-5 rounded-full">
                    Book Appointment
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CrecheCardView = (props) => {
    const data = props.data;

    const DataCol = (props) => {
      if (props.value) {
        return (
          <tr>
            <td className="text-gray-800 font-light">{props.k}</td>
            <td className="px-10 text-gray-400">:</td>
            <td>{props.value}</td>
          </tr>
        );
      } else {
        return <></>;
      }
    };

    return (
      <>
        <div
          key={props.key}
          className="w-full h-fit bg-gray-100 rounded-xl border p-5 flex justify-between align-text-tops"
        >
          <table>
            <tbody>
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
              <tr>
                <td className="text-gray-800 font-light ">Gallery</td>
                <td className="px-10 text-gray-400"></td>
                <td className="flex flex-wrap">
                  {data.gallery_photos?.map((item) => (
                    <>
                      <img
                        className="max-h-52 border p-3 m-2"
                        src={item}
                        alt=""
                      />
                    </>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex flex-col justify-between items-center">
            <img
              className="object-cover w-32 h-32 border rounded-full "
              src={data.profile_photo}
              alt=""
            />

            <button
              onClick={() => {
                window.localStorage.setItem("id", data.username);
                window.localStorage.setItem("t34", true);
                navigate("/checkout");
              }}
              className="px-4 py-1.5 whitespace-nowrap bg-pink-500 text-white rounded"
            >
              Submit Request
            </button>
          </div>
        </div>
      </>
    );
  };

  const FindCrecheView = (prop) => {
    return (
      <div className="w-full h-fit ">
        <ReactGoogleMaps data={prop.data} />

        <div className="w-full h-full mt-10">
          {crecheDetails && <CrecheCardView data={crecheDetails} />}
        </div>
      </div>
    );
  };

  return (
    <div className="pb-20">
      {details && (
        <div className="w-full max-w-screen-xl mx-auto mt-20">
          <CardView data={details} />
        </div>
      )}

      {appointedBabysitter && (
        <div className="w-full max-w-screen-xl mx-auto rounded border mt-10 p-5">
          <h2 className="text-4xl font-bold mb-10 mt-5 pl-5 text-gray-700">
            Appointments
          </h2>
          {appointedBabysitter?.map((item, key) => {
            return <AppointedBabysitter data={item} key={key} />;
          })}
        </div>
      )}

      <div className="w-full max-w-screen-xl mx-auto rounded border mt-10 p-5">
        <h2 className="text-4xl font-bold mb-10 mt-5 pl-5 text-gray-700">
          Find Babysitters
        </h2>
        {babySitterData?.map((item, key) => (
          <BabysittersCardView data={item.data[0].data[0]} key={key} />
        ))}
      </div>

      <div className="w-full h-full max-w-screen-xl mx-auto rounded border mt-10 p-5">
        <h2 className="text-4xl font-bold mb-10 mt-5 pl-5 text-gray-700">
          Find Creche
        </h2>
        <FindCrecheView data={crecheData} />
      </div>

      <div className="w-full max-w-screen-xl mx-auto rounded border mt-10 p-5">
        <table className="table">
          <thead>
            <tr>
              <td>Id</td>
              <td>Provider</td>
              <td>Child</td>
              <td>Description</td>
              <td>Payment Method</td>
              <td>Status</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            <td>1</td>
            <td>Fake Name</td>
            <td>Child Name</td>
            <td>Some great short description.</td>
            <td>Card</td>
            <td>Completed</td>
            <td>6,000</td>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParentDashboard;
