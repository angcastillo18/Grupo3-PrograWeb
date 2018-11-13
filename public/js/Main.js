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
  		//alert("Debe verificar su correo para acceder a esta información");
  		//location.href ='index.html';
    }
  } else {
  	document.getElementById("cuerpo").style.display="block";
  	//alert("Debe iniciar sesión para acceder a esta información");
  	//location.href ='index.html';
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


function mostrarLista(){
  var tabla =document.createElement("table");
  


  var query = firebase.database().ref("users").orderByKey();
    query.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
      console.log(query);
      var user = document.createElement("tr");
      var key = childSnapshot.key;
      user.innerHTML=key;
      var childData = childSnapshot.val();
      for(i in childData){
        var data = document.createElement("td");
        data.innerHTML=childData[i];  
        user.appendChild(data);
      }
      tabla.appendChild(user);  
    });
  });
  document.getElementById("cuerpo").appendChild(tabla);
}
