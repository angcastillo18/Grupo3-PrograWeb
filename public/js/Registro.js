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


//Permite el submit
document.getElementById('registerForm').addEventListener('submit',registro);

//Si ya está logueado, no puede acceder y se le redirecciona a la página principal
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location.href = ('index.html');
} else {
    // No user is signed in.
  }
}); 

function registro(e){
  e.preventDefault();
  //Se usan los diferentes valores para crear al usuario con su correo y contraseña
  //Los demás datos se almacenan en la base de datos

  var username = document.getElementById("username").value;
  var name = document.getElementById("name").value;
  var lName = document.getElementById("lName").value;
  var mail = document.getElementById("mail").value;
  var psw = document.getElementById("psw").value;
  var username = document.getElementById("username").value;
  var ref = firebase.database().ref('users/'+username);
  ref.once("value")
  .then(function(snapshot){
    var a = snapshot.exists();
  if (verificarDatos(a)===true) {
    firebase.auth().createUserWithEmailAndPassword(mail,psw).then(function(user) {
      writeDatabase(username,name,lName,mail,psw);
      document.getElementById('registerForm').reset();
      displayOff('container');
      displayOn('container2');

      //Se le envía el correo de verificación  
      sendEmailVerification();
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('La contraseña ingresada no tiene los requisitos mínimos de seguridad');
        } else if(errorCode =='auth/email-already-in-use'){
          alert('El correo '+mail+" ya está en uso");
        } else if(errorCode == 'auth/invalid-email'){
          alert('Debe ingresar un correo válido');
        }
      });
    }
  });
}

function displayOn(value){
  document.getElementById(value).style.display='block';
  
}

function displayOff(value){
  document.getElementById(value).style.display='none';

}

//Se verifican los datos de manera preliminar 
function verificarDatos(a) {
  var username = document.getElementById("username").value;
  var name = document.getElementById("name").value;
  var lName = document.getElementById("lName").value;
  var mail = document.getElementById("mail").value;
  var psw = document.getElementById("psw").value;
  var regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/;
  var existe = false;

  if (currentUser()==true) {
    alert("Debe cerrar sesión para poder crear una nueva cuenta.")
    return false;
  }
  else if ( (username == null || username.length == 0 || /^\s+$/.test(username)) ) {
   // Si no se cumple la condicion...
   alert('Es obligatorio indicar el nombre de usuario que desea usar');
   return false;
  }
  else if (a==true){
    alert('El usuario '+username+ ' ya se encuentra registrado');
    return false;
  }
  else if ( name == null || name.length == 0 || /^\s+$/.test(name) ) {
   // Si no se cumple la condicion...
   alert('Es obligatorio llenar el campo del nombre');
   return false;
  }
  else if ( lName == null || lName.length == 0 || /^\s+$/.test(lName) ) {
   // Si no se cumple la condicion...
   alert('Es obligatorio llenar el campo del apellido');
   return false;
  }
  else if ( (regex.test(mail))||mail.length == 0 || mail==null){
   // Si no se cumple la condicion...
   alert('Debe ingresar un correo válido');
   return false;
 }
 else if (psw.length<5) {
   // Si no se cumple la condicion...
   alert('La contraseña debe tener al menos 6 caracteres');
   return false;
 }
  // Si el script ha llegado a este punto, todas las condiciones
  // se han cumplido, por lo que se devuelve el valor true
  return true;
}

//Función que envía el correo de verificación
function sendEmailVerification(){
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    // Email sent.
  }).catch(function(error) {
    // An error happened.
  });
}

//La sesión actual del usuario
function currentUser(){
  var user = firebase.auth().currentUser;
  if (user) {
    
    return user.uid;
  } else {
    
  }
}

//Dado que la base de datos de firebase funciona como un gran arreglo de key-value
//La forma en la que se escriben es muy parecida a la de un archivo JSON
function writeDatabase(username,name, lName, mail, psw) {

  firebase.database().ref('users/' + username).set({
    name: name,
    lName: lName,
    mail: mail,
    psw: psw
  });
}

//Con esto podemos registrar a los usuarios de manera simultánea
//Luego de agregarlos a la base de datos, debemos crear el usuario
//Recorremos la base de datos y creamos cada cuenta
//Lamentablemente FIrebase en su versión gratuita solo admite 1000 usuarios como máximo por cuenta.

function registrarDB(){
  var query = firebase.database().ref("users").orderByKey();
  query.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
        var mail = childData["mail"];
        var psw = childData["psw"]+"";
        console.log(mail);
        console.log(psw);
        firebase.auth().createUserWithEmailAndPassword(mail,psw).then(function(user) {
        
        }).catch(function(error) {
        });
    });
  });    

}
