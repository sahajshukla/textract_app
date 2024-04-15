import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDNYlowcEpXtCE5HKQ1kK4hPmVSUcwTtS4",
  authDomain: "ocr-textract-dev.firebaseapp.com",
  projectId: "ocr-textract-dev",
  storageBucket: "ocr-textract-dev.appspot.com",
  messagingSenderId: "346774948760",
  appId: "1:346774948760:web:c99a87bb4a323be1cff9ed",
  measurementId: "G-5WJTSNQD7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

