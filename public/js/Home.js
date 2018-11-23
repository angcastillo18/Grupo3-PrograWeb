/*
  ✄╔═══╗                
  ✄║╔═╗║
  ✄║╚═╝╠═╦══╦══╦═╦══╦╗╔╦══╦══╦╦══╦═╗
  ✄║╔══╣╔╣╔╗║╔╗║╔╣╔╗║╚╝║╔╗║╔═╬╣╔╗║╔╗╗
  ✄║║──║║║╚╝║╚╝║║║╔╗║║║║╔╗║╚═╣║╚╝║║║║
  ✄╚╝──╚╝╚══╩═╗╠╝╚╝╚╩╩╩╩╝╚╩══╩╩══╩╝╚╝
  ✄─────────╔═╝║
  ✄─────────╚══╝
  ✄╔╗╔╗╔╗──╔╗
  ✄║║║║║║──║║         
  ✄║║║║║╠══╣╚═╗         
  ✄║╚╝╚╝║║═╣╔╗║         
  ✄╚╗╔╗╔╣║═╣╚╝║        
  ✄─╚╝╚╝╚══╩══╝         
*/

//Se cierra sesión
function cerrarSesion(){
  window.location.href = 'index.html';
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  
	}).catch(function(error) {
		alert("Un error no identificado ha ocurrido")
  });
}


//Maneja la sesión del usuario
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    displayOn("logoff");
    if (verifyMail()==true) {
      mostrarLista();
      //Solo si está conectado y tiene el correo verificado, puede ver la lista de usuarios
    } else {
      alert("Debes verificar tu correo para ver la lista de usuarios")
      window.location.href = 'index.html';
    }
  } else {
    window.location.href = 'index.html';
  }
});


function displayOn(value){
  document.getElementById(value).style.display='block';
  
}

function displayOff(value){
  document.getElementById(value).style.display='none';

}


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

//Nos permite mostrar la lista
//Recorremos la base de datos y usamos sus valores de acuerdo a lo que se quiera mostrar
function mostrarLista(){
  var tabla =document.createElement("table");
  var td = document.createElement('td');
  var tr = document.createElement('tr');
  var array = ["Usuario","Nombre","Apellido","Correo"];
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
      /*for(i in (childData)){
        td = document.createElement("td");
        td.innerHTML=childData[i];
        tr.appendChild(td);

      }*/
      td = document.createElement("td");
      td.innerHTML=childData['name'];
      tr.appendChild(td);

      td = document.createElement("td");
      td.innerHTML=childData['lName'];
      tr.appendChild(td);

      td = document.createElement("td");
      td.innerHTML=childData['mail'];
      tr.appendChild(td);

      tbody.appendChild(tr);
      tabla.appendChild(tbody);
    });
  });
  document.getElementById("cuerpo").appendChild(tabla);
}
