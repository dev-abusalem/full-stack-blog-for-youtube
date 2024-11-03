import { Loader2 } from "lucide-react";
import React from "react";

const Loadar = () => {
  return (
    <div className="w-full p-6 rounded bg-white">
      <div className="flex justify-center items-center">
        <Loader2 className="w-8 text-primary h-8 animate-spin" />
      </div>
    </div>
  );
};

export default Loadar;
