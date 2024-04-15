import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const app = firebase.initializeApp({
    apiKey: "AlzaSyDNYlowcEpXtCE5HKQ1kK4hPmVSUcwTtS4",
    authDomain: "ocr-textract-dev.firebaseapp.com",
    projectId: "ocr-textract-dev",
    storageBucket: "ocr-textract-dev.appspot.com",
    messagingSenderId: "346774948760",
    appId: "1:346774948760:web:c99a87bb4a323be1cff9ed"
})

export const auth = app.auth()
export default app

