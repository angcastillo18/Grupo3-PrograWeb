function cerrarSesion(){
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
	}).catch(function(error) {
		alert("Un error no identificado ha ocurrido")
});
 }

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (verifyMail()==true) {

    } else {
    	document.getElementById("cuerpo").style.display="block";
  		alert("Debe verificar su correo para acceder a esta información");
  		location.href ='index.html';
    }
  } else {
  	document.getElementById("cuerpo").style.display="block";
  	alert("Debe iniciar sesión para acceder a esta información");
  	location.href ='index.html';
  }
});


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
