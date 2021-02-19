import axios from "axios";
import queryString from "query-string";
import firebase from "firebase";


const getFirebaseToken = async () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    return currentUser.getIdToken();
  }

   //if Not logged in
  const hasRememberAccount = localStorage.getItem(
    'firebaseui::rememberedAccounts'
  );
  if (!hasRememberAccount) {
    return null;
  }
  //If logged in but current user is not fetched => wait
  return new Promise((resolve, reject) => {
    const waitTimeout = setTimeout(() => {
      reject(null);
      console.log("Reject Timeout");
    }, 10000);

    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          // console.log("User is not logged in!");
          reject(null);
        }
        // console.log("Logged in user : ", user.displayName); 

        const token = await user.getIdToken();
        console.log(" [Axios]:Logged in user token:", token);
        resolve(token);

        unregisterAuthObserver();
        clearTimeout(waitTimeout);
      });
  });
};

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});



axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...

  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  const token = await getFirebaseToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
