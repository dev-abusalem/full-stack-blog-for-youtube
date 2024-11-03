import { utApi } from "../utils/uploadthing";

export const removeImage = async (imageKey) => {
  try {
    const success = await utApi.deleteFiles(imageKey);
    console.log({ success: success });
    return success;
  } catch (error) {
    console.log(error);
    return error;
  }
};
