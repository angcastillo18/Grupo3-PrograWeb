document.getElementById('loginForm').addEventListener('submit',returnMail);

firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        
        displayOff("container")
        
        if (verifyMail()==true){
          
          displayOn("cont")  
          displayOn("logoff");
        }else{
          
          displayOn("cont2")
          displayOn("logoff");
        }
      }else{

        displayOff("cont")
        displayOff("cont2")
       displayOn("container") 
       displayOff("logoff");

        displayOff("cont");
        displayOff("cont2");
       displayOn("container");
       displayOff("logoff"); 

      }
    });
  
function login(mail){
  var psw = document.getElementById("psw").value;
  console.log(mail);
  if (mail==null) {
    alert("El usuario que ha ingresado no existe");
  }
  firebase.auth().signInWithEmailAndPassword(mail, psw).then(function(user) {
    

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
      var errorMessage = error.message;
    if (errorCode === ('auth/wrong-password')) {
        alert('La contraseña o usuario que ha ingresado es inválido.'+'\nInténtelo nuevamente.');
    } else if(errorCode === 'auth/user-not-found'){
        alert('El siguiente usuario no se encuentra registrado');
    } else if(errorCode==="auth/invalid-email"){
        alert('La contraseña o usuario que ha ingresado es inválido.'+'\nInténtelo nuevamente.');
    }else
      console.log(error);
  });
}

function returnMail(e){
  e.preventDefault();
  var username = document.getElementById("username").value;
  var ref = firebase.database().ref('users/'+username);
  ref.once("value").then (function(snapshot) {
    var mail = snapshot.child('mail').val();
    login(mail);
  }, function (error) {
   console.log("Error: " + error.code);
  });
}



function recuperarContra(){
  var auth = firebase.auth();
  var emailAddress = "user@example.com";

  auth.sendPasswordResetEmail(emailAddress).then(function() {
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
        console.log("registrado");
    }else{
        return false;
    }
  }
}

function currentUser(){
  var user = firebase.auth().currentUser;
  if (user) {
    return true;
  } else {
    return false;
  }
}

function change(){
  if (currentUser()==true) {
    alert("Tiene una sesión abierta, si quiere registrar un usuario debe cerrar sesión primero");
  }else{
    window.location.href = 'registerPage.html';
  }
}

function cerrar(){

  firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
}

function displayOn(value){
  document.getElementById(value).style.display='block';
  
}

function displayOff(value){
  document.getElementById(value).style.display='none';

}