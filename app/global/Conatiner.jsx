import React from "react";

const Conatiner = ({ children }) => {
  return (
    <div className="lg:max-w-[1200px] mx-auto lg:px-5 px-10 w-full ">
      {children}
    </div>
  );
};

export default Conatiner;
