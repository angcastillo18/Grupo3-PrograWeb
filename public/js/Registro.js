document.getElementById('registerForm').addEventListener('submit',registro);


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    

      


  } else {
    // No user is signed in.
  }
}); 

function registro(e){
  e.preventDefault();
  var username = document.getElementById("username").value;
  var name = document.getElementById("name").value;
  var lName = document.getElementById("lName").value;
  var mail = document.getElementById("mail").value;
  var psw = document.getElementById("psw").value;
  
  if (verificarDatos()===true) {
    firebase.auth().createUserWithEmailAndPassword(mail,psw).then(function(user) {
      writeDatabase(username,name,lName,mail,psw);
      document.getElementById('registerForm').reset();
      displayOff('container');
      displayOn('container2');

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
}

function displayOn(value){
  document.getElementById(value).style.display='block';
  
}

function displayOff(value){
  document.getElementById(value).style.display='none';

}

function verificarDatos() {
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

function sendEmailVerification(){
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    // Email sent.
  }).catch(function(error) {
    // An error happened.
  });
}

function verifyMail(){
  var user = firebase.auth().currentUser;
  if (user!=null) {
    var emailVerified = user.emailVerified;
    if (user.emailVerified==true) {
        return true;
    }else{
        sendEmailVerification();
        return false;
    }
  }
}

function currentUser(){
  var user = firebase.auth().currentUser;
  if (user) {
    
    return user.uid;
  } else {
    
  }
}

function writeDatabase(username,name, lName, mail, psw) {

  firebase.database().ref('users/' + username).set({
    name: name,
    lName: lName,
    mail: mail,
    psw: psw
  });
}

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





function verificarUsuario(usuario){
  firebase.auth().createUserWithEmailAndPassword(mail,psw).then(function(user) {

    }).catch(function(error) {
      });
}