// setup 

const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if(user){
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div> Logged in as ${user.email} </div>
        <div> ${doc.data().bio} </div>`
        accountDetails.innerHTML = html;
    })
    

    // toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    
  }
  else{
    accountDetails.innerHTML = "";
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    
  }
}
const setupGuides = (data) => {
  if(data.length){
  let html = '';
  data.forEach(doc => {
    const guide = doc.data();
    console.log(guide);
    const li = `
    <li>
        <div class="collapsible-header grey lighten-4">${guide.title}</div>
        <div class="collapsible-body white">${guide.Content}</div>
      </li>
    `;
    html+=li
    
  });
  guideList.innerHTML = html;
} else{
  guideList.innerHTML = "<h5> Please Login to view the data <h5>"
}


}
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });