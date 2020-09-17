// signup

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //sign up the user

    auth.createUserWithEmailAndPassword(email,password).then((credential) => {
        console.log(credential);
        const modal = document.querySelector('#modal-signup');
        M.modal.getInstance(modal).close();
        signupForm.reset();
    });
});


// sign users out

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("User Signed Out!");
    });
})