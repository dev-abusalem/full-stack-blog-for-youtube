import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice";
import authReducer from "./slices/authSlice";
import { fetchPosts } from "./slices/postSlice";
import contactsReducer, { fetchcontact } from "./slices/contactSlice";
import newsletterReducer, { fetchnewsletters } from "./slices/newletterSlice";
const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
    contacts: contactsReducer,
    newsletters: newsletterReducer,
  },
});
// Automatically dispatch fetchPosts on store initialization
store.dispatch(fetchPosts());
store.dispatch(fetchcontact());
store.dispatch(fetchnewsletters());

export default store;
