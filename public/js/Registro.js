firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user = document.getElementById("user").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("mail").value;
    var password = document.getElementById("psw").value;
    if (true) {
      alert("Usuario creado, verifique el enlace enviado a su correo y entre en la página principal");
      //sendEmailVerification();
      //writeDatabase(user,name,mail,psw);
      
      firebase.database().ref('users/' + user).set({
        name: name,
        email: email,
        password: password
      });
      signOut();
      window.location.href = 'Index.html';
    }else{

    }
  }else{
        
  }
});
 

function registro(){
  if (verificarDatos()===true) {
    var mail = document.getElementById("mail").value;
    var psw = document.getElementById("psw").value;
    firebase.auth().createUserWithEmailAndPassword(mail,psw)
    .catch(function(error) {

      // Handle Errors here.
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

function verificarDatos() {
  var user = document.getElementById("user").value;
  var name = document.getElementById("name").value;
  var mail = document.getElementById("mail").value;
  var psw = document.getElementById("psw").value;
  var regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/;
  if (currentUser()==true) {
    alert("Debe cerrar sesión para poder crear una nueva cuenta.")
    return false;
  }
  else if ( (user == null || user.length == 0 || /^\s+$/.test(user)) ) {
   // Si no se cumple la condicion...
   alert('Es obligatorio indicar el nombre de usuario que desea usar');
   return false;
  }
  else if ( name == null || name.length == 0 || /^\s+$/.test(name) ) {
   // Si no se cumple la condicion...
   alert('Es obligatorio llenar el campo de nombre y apellidos ');
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
    console.log(user.uid);
    return user.uid;
  } else {
    
  }
}

function signOut(){

  firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
}


function writeDatabase(username, name, email, psw) {

  firebase.database().ref('users/' + "uno").set({
    name: "dos",
    email: "tres",
    password: "cuatro"
  });
}

function test(){
  var user = document.getElementById("user").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("mail").value;
    var password = document.getElementById("psw").value;
  firebase.database().ref('users/' + user).set({
    name: name,
    email: email,
    password: password
  });
  }
  /*firebase.database().ref('users/' + "userId").set({
    username: "name",
    email: "email",
    profile_picture : "imageUrl"
  });
  
}*/