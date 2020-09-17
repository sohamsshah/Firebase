const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create elements and render cafe

function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id',doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().City;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // delete data
    cross.addEventListener('click',(e) => {
        console.log('clicked');
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
}

// Get collections

db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => renderCafe(doc));
});


// Save Data to the DataBase

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        City: form.City.value
    });
    form.name.value="";
    form.City.value="";
});

// Querying Data (UNCOMMENT IT FOR USAGE)

db.collection('cafes').where('name','==','Ahmedabad').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    })
})


// ORDERING DATA

db.collection('cafes').orderBy('City').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
});

// COMPOSITE ORDERING

db.collection('cafes').where('name', '==', 'Dannys').orderBy('City').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
});

// real-time listener

db.collection('cafes').orderBy('City').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderCafe(change.doc);
        }
        else if(change.type == 'removed'){
            let li = cafeList.querySelector(`[data-id=${change.doc.id}]`);
            cafeList.removeChild(li);
        }
    });
});


// Updating Data SYNTAX

// db.collection('cafes').doc(id).update({name: 'CYD'}) -> UPDATES
// db.collection('cafes').doc(id).set({name: 'CYD', city: 'ABC'}) -> OVERWRITES and SETS




