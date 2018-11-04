// Get a reference to the database service
var database = firebase.database();
function observer(status){
  if (status==true) {
    firebase.auth().onAuthStateChanged(function(user) {
      var logStatus = document.getElementById("log");
      if (user) {
        if (verifyMail()==false){
          logStatus.innerHTML = "nv";
          logStatus.style.backgroundColor = "red";
        }else{
          logStatus.innerHTML = "nv";
          logStatus.style.backgroundColor = "blue";
        }
      }
    });
  }
}
  
function login(){
  var email = document.getElementById("username").value;
  var contra = document.getElementById("password").value;
  console.log(email+contra);
  firebase.auth().signInWithEmailAndPassword(email, contra)
    .catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === ('auth/wrong-password')) {
        alert('La contraseña o usuario que ha ingresado es inválido.'+'\nInténtelo nuevamente.');
      } else if(errorCode === 'auth/user-not-found'){
        alert('El siguiente usuario no se encuentra registrado');
      }
      console.log(error);
    });
}





function recuperarContra(){
  var auth = firebase.auth();
  var emailAddress = "user@example.com";

  auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
  }).catch(function(error) {
  // An error happened.
  });
}

function verifyMail(){
  var user = firebase.auth().currentUser;
  if (user!=null) {
    var emailVerified = user.emailVerified;
    if (user.emailVerified==true) {
        return true;
        console.log("registrado");
    }else{
        return false;
    }
  }
}