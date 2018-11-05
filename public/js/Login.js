firebase.auth().onAuthStateChanged(function(user) {
      var logStatus = document.getElementById("logon");
      var logStatus2 = document.getElementById("logoff");
      if (user) {
        if (verifyMail()==false){
          logStatus.innerHTML = "No verificado";
          logStatus.style.backgroundColor = "red";
          logStatus2.innerHTML="Bienvenido "+ user.displayName;
        }else{
          logStatus.innerHTML = "Verificado";
          logStatus.style.backgroundColor = "blue";
          logStatus2.innerHTML="Bienvenido "+ user.email;
        }
      }else{
        logStatus.innerHTML = "No ha iniciado sesión";
        
      }
    });
  
function login(){
  var email = document.getElementById("username").value;
  var contra = document.getElementById("password").value;
  console.log(email+contra);
  firebase.auth().signInWithEmailAndPassword(email, contra)
    .catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === ('auth/wrong-password')) {
        alert('La contraseña o usuario que ha ingresado es inválido.'+'\nInténtelo nuevamente.');
      } else if(errorCode === 'auth/user-not-found'){
        alert('El siguiente usuario no se encuentra registrado');
      } else if(errorCode==="auth/invalid-email"){
        alert('La contraseña o usuario que ha ingresado es inválido.'+'\nInténtelo nuevamente.');
      }
      console.log(error);
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