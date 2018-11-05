function cerrarSesion(){
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
	}).catch(function(error) {
		alert("Un error no identificado ha ocurrido")
});
 }

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
  } else {
  	location.href ='index.html';
  }
});
