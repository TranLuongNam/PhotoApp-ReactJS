import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import productApi from "./api/productApi";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import SignIn from "./features/Auth/pages/SignIn";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { getMe } from "./app/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const Photo = React.lazy(() => import("./features/Photo"));
//Tu dong load component Photo khi function App render.
// React.lazy =>lazyload component can su dung,React.lazy nhận vào một function .
// Khi su dung React.lazy phai si dung Suspense để truyền một loading component.
// Code-Splitting : kỹ thuật giúp tăng tốc thời gian load JS của React.

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIRABASE_API,
  authDomain: process.env.REACT_APP_FIRABASE_AUTH_DOMAIN,
  // ...
};
firebase.initializeApp(config);

function App() {
  const [productList, setProductList] = useState([]); //luu productList trong component useState()
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };

        const response = await productApi.getAll(params);
        console.log(response);
        setProductList(response.data);
      } catch (error) {
        console.log("Fail to fetch product list!", error);
      }
    };
    fetchProductList();
  }, []);

  //Handle firebase auth changed
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          console.log("User is not logged in!");
          return;
        }

        //Get me when signed in
        try {
          const actionResult = await dispatch(getMe());
          const currentUser = unwrapResult(actionResult);
          console.log("Logged in user:", currentUser);
        } catch (error) {
          console.log("Failed to login:", error.message);
        }
      });

    return () => unregisterAuthObserver();
  }, []);

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Navbar />
          <Header />
          <Switch>
            <Redirect exact from="/" to="/photos" />
            <Route path="/photos" component={Photo} />
            <Route to="/sign-up" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
