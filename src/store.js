import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase';
import firebase from 'firebase';

// Add Firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseStateReducer
});

// Firebase config
const config = {
  apiKey: "AIzaSyDESneV1XCREO6InW2HeSKKhZPTyxj1Zt8",
  authDomain: "rocket-workshop.firebaseapp.com",
  databaseURL: "https://rocket-workshop.firebaseio.com",
  projectId: "rocket-workshop",
  storageBucket: "rocket-workshop.appspot.com",
  messagingSenderId: "326348014292"
};
const rrfConfig = { userProfile: 'users' } // react-redux-firebase config

// initialize firebase instance
const firebaseApp = firebase.initializeApp(config) // <- new to v2.*.*

// Add reduxReduxFirebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseApp, rrfConfig), // firebase instance as first argument
)(createStore)

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer, {});

export default store;
