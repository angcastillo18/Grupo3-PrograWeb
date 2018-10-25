 function registro(){

    var email= document.getElementById("correo").value;
    var password= document.getElementById("contra").value;

    console.log(email+password);  
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});





/*
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    alert('La contraseña no cumple los requisitos mínimos de seguridad');
  } else if(errorCode=="auth/email-already-in-use"){
    alert("El correo ingresado ya existe");
  }else if(errorCode=="auth/invalid-email"){
    alert("El correo es inválido");
  }
  console.log(error);
});

    */
 }


 function salir(){
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
 }

