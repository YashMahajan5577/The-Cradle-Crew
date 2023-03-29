import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import { OverlayView } from "@react-google-maps/api";

const options = {
  zoomControlOptions: {
    position: "right-center", // 'right-center' ,
    // ...otherOptions
  },
};

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

// const center = {
//   lat: 0,
//   lng: -180,
// };

const position = {
  lat: 37.772,
  lng: -122.214,
};

const onLoad = (marker) => {
  console.log("marker: ", marker);
};

const center = {
  lat: 35.772,
  lng: -120.214,
};

const onClick = () => {
  console.info("I have been clicked!");
};

const divStyle = {
  background: "white",
  border: "1px solid #ccc",
  padding: 4,
};

export default function ReactGoogleMaps(props) {
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
        zoom={props.mapZoom}
        center={props.lat ? { lat: props.lat, lng: props.long } : center}
        onClick={(data) => {
          props.click({ lat: data.latLng.lat(), lng: data.latLng.lng() });
        }}
      >
        {/* <Marker onLoad={onLoad} position={position} /> */}
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
