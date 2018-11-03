// Get a reference to the database service
var database = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user = firebase.auth().currentUser;
    if (user!=null) {
      var emailVerified = user.emailVerified
      if (user.emailVerified==true) {
        alert("Ha iniciado sesión correctamente");
        console.log("registrado");
      }else{
        alert("Verifique el correo de activación enviado a su cuenta de correo "+ user.email);
        firebase.auth().signOut().then(function() 
          { 
          }).catch(function(error) {
          // An error happened.
        });
      }
    }
  } else {

  }
});



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
