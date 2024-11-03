const { secret } = require("./generateAuthToken");
import { jwtDecode } from "jwt-decode";
export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token, "secret");
    return decoded.user;
  } catch (error) {
    console.log(error);
  }
};
