// ReduxWrapper.js
"use client";
import { Provider } from "react-redux"; // Import from react-redux, not radix-ui
import store from "./context/store";

const ReduxWrapper = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxWrapper;
