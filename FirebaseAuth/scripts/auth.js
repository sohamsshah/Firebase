// listen for auth status changes

auth.onAuthStateChanged(user => {
    user ? console.log("User Logged In", user) : console.log("User Logged Out!"); // returns user if logged in and null if logged out
})


// signup

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //sign up the user

    auth.createUserWithEmailAndPassword(email,password).then((credential) => {
        
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});


// sign users out

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut();
})

// log in

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('click', (e) => {
    e.preventDefault();
    // get user Info

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
})