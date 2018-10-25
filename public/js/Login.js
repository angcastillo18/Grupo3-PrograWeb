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
    location.href ='main.html';
    alert("ha iniciado sesión");
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
    if (errorCode === ('auth/user-not-found' || 'auth/wrong-password')) {
      alert('La contraseña que ha ingresado es incorrecta');
    } else if(errorCode === 'auth/user-not-found'){
      alert('El usuario no existe');
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
*/




function recuperarContra(){
  var auth = firebase.auth();
  var emailAddress = "user@example.com";

  auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
  }).catch(function(error) {
  // An error happened.
  });
}