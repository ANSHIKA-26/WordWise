// Function to render the login UI
export function renderLogin(container) {
    container.innerHTML = `
        <div id="auth-status" class="flex items-center bg-[#8b5cf6] hover:bg-[#753ff1] text-white text-sm font-medium mr-2 space-x-4 p-2 shadow-lg rounded-md border-none hidden ">
        </div>

        <div class="flex flex-col items-center">
            <button id="google-login-btn" class="bg-[#8b5cf6] flex hover:bg-[#753ff1] text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out mb-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Logo" class="w-5 h-5 mr-1">    
                Sign in with Google
            </button>

            <label class="flex items-center mb-4">
                <input type="checkbox" id="remember-me" class="mr-2" /> 
                Remember Me
            </label>

            <button id="logout-btn" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300 ease-in-out hidden">
                Sign out
            </button>
        </div>
    `;

    // Attach event listeners for sign-in and sign-out buttons
    document.getElementById('google-login-btn').addEventListener('click', signInWithGoogle);
    document.getElementById('logout-btn').addEventListener('click', signOut);
}

// ... [Firebase setup code here] ...

// Function to handle Google sign-in
function signInWithGoogle() {
    signInWithPopup(auth, googleAuthProvider)
        .then((result) => {
            // Check if "Remember Me" is checked
            const rememberMe = document.getElementById('remember-me').checked;
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', result.user.email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            initializeUser(result.user);
        })
        .catch((error) => {
            console.error('Error during sign-in:', error);
        });
}

// Function to log out the user
export default function signOut() {
    firebaseSignOut(auth)
        .then(() => {
            initializeUser(null);
            document.getElementById('google-login-btn').classList.remove('hidden');
            localStorage.removeItem('rememberedEmail'); // Clear remembered email on logout
        })
        .catch((error) => {
            console.error('Error during sign-out:', error);
        });
}

// Function to check authentication state
function initializeUser(user) {
    const authStatus = document.getElementById('auth-status');
    const googleBtn = document.getElementById('google-login-btn');
    const signoutBtn = document.getElementById('logout-btn')
    if (user) {
        authStatus.innerHTML = `View profile: ${user.displayName}`;
        googleBtn.classList.add('hidden');
        signoutBtn.classList.remove('hidden');
        authStatus.classList.remove('hidden')

        authStatus.style.cursor = 'pointer';
        authStatus.addEventListener('click', () => {
            const name = user.displayName ? encodeURIComponent(user.displayName) : 'unknown';
            const email = user.email ? encodeURIComponent(user.email) : 'unknown';
            const profilePic = user.photoURL ? encodeURIComponent(user.photoURL) : '';

            window.location.href = `/profile?name=${name}&email=${email}&profilePic=${profilePic}`;
        });
    } else {
        authStatus.innerHTML = '';
        signoutBtn.classList.add('hidden');
        authStatus.removeEventListener('click', () => { });
    }
}

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    initializeUser(user);
});
