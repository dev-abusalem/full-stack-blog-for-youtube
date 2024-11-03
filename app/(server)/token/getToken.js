import Cookies from "js-cookie";

export const getToken = () => {
  try {
    const token = Cookies.get("token");
    return token;
  } catch (error) {
    return null;
  }
};
