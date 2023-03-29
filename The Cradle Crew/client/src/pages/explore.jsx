import React, { useEffect, useState } from "react";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import Api from "../routes/api";
import { useNavigate } from "react-router-dom";
const REACT_APP_GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

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

const Explore = () => {
  const [babySitterData, setBabySitterData] = useState(null);
  const [crecheData, setCrecheData] = useState([]);
  const [crecheDetails, setCrecheDetails] = useState(null);
  
  function ReactGoogleMaps(prop) {
    const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY, // ,
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

          <img
            className="object-cover w-32 h-32 mr-3 border rounded-full "
            src={data.profile_photo}
            alt=""
          />
        </div>
      </>
    );
  };

  const BabysittersCardView = (prop) => {
    const data = prop.data.data[0].data[0];
    const navigate = useNavigate();

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
            <div className="mt-2 flex justify-between">
              {/* {data.about_yourself} */}
              <div className="space-x-1 flex text-sm">
                {/* todo */}
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
                    navigate("/login/parent");
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
    );
  };

  const CrecheCardView = (props) => {
    const data = props.data;
    const navigate = useNavigate();
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
        <div className="w-full h-fit bg-white rounded-xl border p-5 flex justify-between align-text-tops">
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
                <td className="text-gray-800 font-light">Gallery</td>
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
                navigate("/login/parent");
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
      <div className="w-full h-full max-w-screen-xl mx-auto rounded border mt-10 p-5">
        <h2 className="text-4xl font-bold mb-10 mt-5 pl-5 text-gray-700">
          Explore Creche
        </h2>
        <FindCrecheView data={crecheData} />
      </div>
      {babySitterData && (
        <div className="w-full max-w-screen-xl mx-auto rounded border mt-10 p-5">
          <h2 className="text-4xl font-bold mb-10 mt-5 pl-5 text-gray-700">
            Find Babysitters
          </h2>
          {babySitterData?.map((item, key) => (
            <BabysittersCardView data={item} key={key} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
