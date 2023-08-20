import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAlb0NzwRXUNBm9N-m9bs1qeEqflc90kzk",
    authDomain: "nero01-21684.firebaseapp.com",
    databaseURL: "https://nero01-21684-default-rtdb.firebaseio.com",
    projectId: "nero01-21684",
    storageBucket: "nero01-21684.appspot.com",
    messagingSenderId: "476264159174",
    appId: "1:476264159174:web:90258319a9a5342390c4c7",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export default database;
