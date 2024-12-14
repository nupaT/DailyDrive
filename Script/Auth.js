
  // Import the functions you need from the SDKs you need
  // import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

  // import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  
  // // TODO: Add SDKs for Firebase products that you want to use
  // // https://firebase.google.com/docs/web/setup#available-libraries

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, push, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
  // // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDvacZY-cX80BTDlUVaeRzVpiAC5tJTcGU",
    authDomain: "dailydrive-9c942.firebaseapp.com",
    databaseURL: "https://dailydrive-9c942-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dailydrive-9c942",
    storageBucket: "dailydrive-9c942.firebasestorage.app",
    messagingSenderId: "893889408051",
    appId: "1:893889408051:web:5b9998657fb15a1a7c8746"
  };


const appSettings = {
  databaseURL: "https://dailydrive-9c942-default-rtdb.europe-west1.firebasedatabase.app/"
}

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  const authButt = document.getElementById('auth-button');
  
  authButt.addEventListener('click', function(event) {
    // event.preventDefault();

    const authUser = document.getElementById('auth-name').value;
    const password = document.getElementById('auth-pass').value;
    const email = document.getElementById('auth-email').value;

    alert(`${authUser} ${password} ${email}`);

    createUserWithEmailAndPassword(auth, email, password)

  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("User done")
    // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
  })