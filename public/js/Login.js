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

function login(){
	var usuario = document.getElementById("username").value;
	var contraseña = document.getElementById("password").value;

	firebase.auth().signInWithEmailAndPassword(usuario, contraseña).catch(function(error) {
  	// Handle Errors here.
  	var errorCode = error.code;
  	var errorMessage = error.message;
  	// ...
		}
	);


}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});


