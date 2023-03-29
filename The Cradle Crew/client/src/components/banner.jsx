import React from "react";

const Banner = () => {
  return (
    <div className="w-full h-fit bg-pink-100">
      <div className="w-full max-w-screen-xl h-10 flex justify-between items-center mx-auto">
        <img className="w-20 h-8  object-contain" src="https://img.icons8.com/officel/80/000000/stroller.png" alt="logo" />
      
        <div className="flex space-x-4 text-pink-800 font-semibold">
          <span>+910123456789</span>
          <span>example@email.com</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
