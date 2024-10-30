// Function to render the login UI
export function renderLogin(container) {
    container.innerHTML = `
        <div id="auth-status" class="text-gray-600 text-sm font-medium mr-2">
            Loading...
        </div>

        <div class="flex justify-evenly">
            <button id="google-login-btn" class="bg-[#8b5cf6] flex hover:bg-[#753ff1] text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out mb-4 hidden">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Logo" class="w-5 h-5 mr-1">    
            Sign in with Google
            </button>

            <button id="logout-btn" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300 ease-in-out hidden">
                Sign out
            </button>
        </div>

    `;

    // Attach event listeners for sign-in and sign-out buttons
    document.getElementById('google-login-btn').addEventListener('click', signInWithGoogle);
    document.getElementById('logout-btn').addEventListener('click', signOut);
}

// Firebase configuration and setup (replace with your actual Firebase config)
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {

    apiKey: "AIzaSyDwowmzH0skVhieH3KPgIP8_vQBzhJmIi4",

    authDomain: "wordwise-d1607.firebaseapp.com",

    projectId: "wordwise-d1607",

    storageBucket: "wordwise-d1607.appspot.com",

    messagingSenderId: "426579758621",

    appId: "1:426579758621:web:5bc883cd5eea3a416940f4",

    measurementId: "G-QL9ZF6G3HH"

};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

// Function to check authentication state
function initializeUser(user) {
    const authStatus = document.getElementById('auth-status');
    const googleBtn = document.getElementById('google-login-btn');
    const signoutBtn = document.getElementById('logout-btn')
    if (user) {
        authStatus.innerHTML = `Logged in as: ${user.displayName}`;
        googleBtn.classList.add('hidden');
        signoutBtn.classList.remove('hidden');
    } else {
        authStatus.innerHTML = '';
        googleBtn.classList.remove('hidden');
        signoutBtn.classList.add('hidden');
    }
}

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    initializeUser(user);
});

// Function to handle Google sign-in
function signInWithGoogle() {
    signInWithPopup(auth, googleAuthProvider)
        .then((result) => {
            initializeUser(result.user);
        })
        .catch((error) => {
            console.error('Error during sign-in:', error);
        });
}

// Function to log out the user
function signOut() {
    firebaseSignOut(auth)
        .then(() => {
            initializeUser(null);
        })
        .catch((error) => {
            console.error('Error during sign-out:', error);
        });
}
