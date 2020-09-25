var firebaseConfig = {
  // your firebase details here
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var uploader = document.getElementById('uploader');
  var fileButton = document.getElementById('fileButton');
  var storage = firebase.storage();

  fileButton.addEventListener('change', (e) => {
      var file = e.target.files[0];
      var storageRef = firebase.storage().ref('test/'+ file.name);
      var task = storageRef.put(file);
      
      task.on('state_changed', 
      function progress(snapshot) {
          var percentage = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
          uploader.value = percentage;
      },

      function error(err){

      },
      function complete() {

      }
)
  });
  

  storage.ref('test/download (1).png').getDownloadURL().then(function(url) {
    console.log(url)
    var img = document.getElementById('myimg');
    img.src = url; // shows the image!
  }).catch(function(error) {
    // Handle any errors
  });