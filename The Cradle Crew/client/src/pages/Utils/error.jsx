import React from "react";

const Error = (props) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-fit h-fit ">{props.status} | Error Occurred.</div>
    </div>
  );
};

export default Error;
