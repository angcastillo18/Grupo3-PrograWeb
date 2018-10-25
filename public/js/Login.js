//validación de los inputs, texto vacio
function emptyField(){
  var user=document.getElementById("username").value;
  var password=document.getElementById("password").value;
  var messageError=document.getElementById("msg__error");
  messageError.innerHTML="";
  if (user.length==0 || password.length==0) {
    messageError.innerHTML="Rellene todos los campos";
  }
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user firebase.auth().currentUser;
    if (user !=null) {


    }
  } else {
    // No user is signed in.
  }
}

  function login(){
    var email = document.getElementById("username").value;
    var contra = document.getElementById("password").value;
    
    if (!firebase.auth().isSignInWithEmailLink(emailLink)) {
      alert("Verifique el enlace enviado a "+email);
      firebase.auth().signInWithEmailLink(email)
      .catch(function(error) {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
      });
    }else {
      firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
  console.log(error);
  });
    }



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