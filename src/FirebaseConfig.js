// // FirebaseConfig.js

// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyDK4U3msdqBDV0Qmu9djxsf2_59__T2m1M",
//     authDomain: "object-detection-6575d.firebaseapp.com",
//     projectId: "object-detection-6575d",
//     storageBucket: "object-detection-6575d.appspot.com",
//     messagingSenderId: "216765022457",
//     appId: "1:216765022457:web:f5696e531c3b9b7f772228",
//     measurementId: "G-BQD2M3RWFD"
//   };

//   const firebaseApp = initializeApp(firebaseConfig);
//   const auth = getAuth(firebaseApp);
//   const googleProvider = new GoogleAuthProvider();
  
//   export { firebaseApp, auth, googleProvider };







// // firebase-config.js

// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { getStorage, ref, uploadBytes } from 'firebase/storage';

// const firebaseConfig = {
//     apiKey: "AIzaSyDK4U3msdqBDV0Qmu9djxsf2_59__T2m1M",
//     authDomain: "object-detection-6575d.firebaseapp.com",
//     projectId: "object-detection-6575d",
//     storageBucket: "object-detection-6575d.appspot.com",
//     messagingSenderId: "216765022457",
//     appId: "1:216765022457:web:f5696e531c3b9b7f772228",
//     measurementId: "G-BQD2M3RWFD"
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);
// const googleProvider = new GoogleAuthProvider();
// const storage = getStorage(firebaseApp);

// export { firebaseApp, auth, googleProvider, storage, ref, uploadBytes };









import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBBBODGs8ZkWtP8a1nbw2kWc4wZSGrkoco",
    authDomain: "object-detection-3a1d6.firebaseapp.com",
    projectId: "object-detection-3a1d6",
    storageBucket: "object-detection-3a1d6.appspot.com",
    messagingSenderId: "316584217369",
    appId: "1:316584217369:web:e56693b740be7db8a31388",
    measurementId: "G-TW568K6796"
  };
  
  
  
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    const googleProvider = new GoogleAuthProvider();
    
    export { firebaseApp, auth, googleProvider };