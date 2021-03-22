import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";

export const initializeLoginFramework = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

const googleProvider = new firebase.auth.GoogleAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();

export const handleGoogleSignIn = () => {
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      const { name, picture, email } = result.additionalUserInfo.profile;
      const isSignedInUser = {
        isSignedIn: true,
        name: name,
        email: email,
        photo: picture,
        success: true
      };
      return isSignedInUser;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
};

export const handleFbSignIn = () => {
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      var user = result.user;
      user.success = true;
      return user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage, errorCode);
    });
};

export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((result) => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        picture: "",
        error: "",
        success: false,
      };
      return signedOutUser;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

export const signInWithEmailAndPassword = (email,password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

const updateUserName = (name) => {
    let user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log("user name updated successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };