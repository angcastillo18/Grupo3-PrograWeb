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
  var td = document.createElement('td');
  var tr = document.createElement('tr');
  var array = ["Usuario","Apellido","Correo","Nombre","Contraseña"];
  var th = document.createElement("th");
  var thead = document.createElement("thead");
  var tbody = document.createElement("tbody");
  for (i = 0; i < array.length; i++) { 
    th = document.createElement('th')
    th.innerHTML=array[i];
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  tabla.appendChild(thead);
  var query = firebase.database().ref("users").orderByKey();
    query.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
      tr = document.createElement("tr")
      var key = childSnapshot.key;
      td = document.createElement('td');
      td.innerHTML=key;
      tr.appendChild(td);
      var childData = childSnapshot.val();
      for(i in childData){
        td = document.createElement("td");
        td.innerHTML=childData[i];
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
      tabla.appendChild(tbody);
    });
  });
  document.getElementById("cuerpo").appendChild(tabla);
}
