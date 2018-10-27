 function registro(){

    var email= document.getElementById("correo").value;
    var password= document.getElementById("contra").value;

    console.log(email+password);  
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    controlarErrores('weakpass');
  } else if('auth/email-already-in-use'){
    controlarErrores('passinuse');
  }
  console.log(error);
});
  }


function controlarErrores(var tipo){

}





