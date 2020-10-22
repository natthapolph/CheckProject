import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import config from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const storage = firebase.storage();
const auth = firebase.auth();
const Auth = firebase.auth;
export { storage, auth, Auth };
