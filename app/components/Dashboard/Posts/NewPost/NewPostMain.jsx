"use client";
import React, { useState } from "react";
import NewPostManual from "./NewPostManual";

const NewPostMain = () => {
  const [isUseAi, setIsUseAi] = useState(false);
  return (
    <>
      <NewPostManual isUseAi={isUseAi} />
    </>
  );
};

export default NewPostMain;
