import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

const RemoveAndPreviewImage = ({
  uploadImageKey,
  uploadImages,
  handleDeleteImage,
}) => {
  return (
    <div className="w-24 h-24 relative">
      <Image
        src={uploadImages}
        alt="Preview"
        className="mt-2 h-[100px] w-[100px]"
        width={100}
        height={100}
      />
    </div>
  );
};

export default RemoveAndPreviewImage;
