import jwt from "jsonwebtoken";

export const generateAuthToken = async (user) => {
  try {
    const token = await jwt.sign({ user: user }, "secret");
    return token;
  } catch (error) {
    console.log(error);
  }
};
