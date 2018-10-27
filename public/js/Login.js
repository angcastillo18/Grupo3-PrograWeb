


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    location.href ='main.html';
    
  } else {
    // No user is signed in.
  }
});

function login(){
    var email = document.getElementById("username").value;
    var contra = document.getElementById("password").value;
    
    firebase.auth().signInWithEmailAndPassword(email, contra)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === ('auth/invalid-email' || 'auth/wrong-password')) {
      alert('La contraseña o usuario que ha ingresado es inválido.'+'\nInténtelo nuevamente.');
    } else if(errorCode === 'auth/user-not-found'){
      alert('El siguiente usuario no se encuentra registrado');
    }else{
      
    }
    console.log(error);
});
  }


    /*
  var email = document.getElementById("username").value;
  var contra = document.getElementById("password").value;

   firebase.auth().signInWithEmailAndPassword(email, contra).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
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
*/
