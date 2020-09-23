
// listen for auth status changes

auth.onAuthStateChanged(user => {
    user ? 
    db.collection('Guides').onSnapshot(snapshot => {
        
        setupGuides(snapshot.docs);
        setupUI(user);   
    })
    : 
    db.collection('Guides').get().then(snapshot => {
        setupUI();
        setupGuides([]);
        
    }) 
    
})

//create new guide

const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Guides').add({
        title: createForm['title'].value,
        Content: createForm['content'].value,
    }).then(() => {
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();

    });
});

// signup

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //sign up the user

    auth.createUserWithEmailAndPassword(email,password).then((credential) => {
        return db.collection('users').doc(credential.user.uid).set({
            bio: signupForm['signup-bio'].value
        });
        
    }).then(() => {
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