import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./app/userSlice";
import photoReducer from "./features/Photo/photoSlice";

const rootReducer = {
  photos: photoReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
