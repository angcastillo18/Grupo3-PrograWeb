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


//Nos permite hacer el submit dentro del formulario del login
document.getElementById('loginForm').addEventListener('submit',returnMail);


//Tiene la sesión del usuario
//Alternamos los display para elegir qué parte de la página mostrar en relación con la sesión del usuario
firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //Significa que el usuario está logueado
        displayOff("container")
        
        if (verifyMail()==true){
          
          displayOn("cont")  
          displayOn("logoff");
        }else{
          
          displayOn("cont2")
          displayOn("logoff");
        }
      }else{
        //Significa que el usuario no está logueado
        displayOff("cont");
        displayOff("cont2");
        displayOn("container");
        displayOff("logoff"); 
      }
    });
  
//Esta función permite a un usuario acceder mediante su correo y contraseña.
//El correo lo recibimos como parámetro  
function login(mail){
  var psw = document.getElementById("psw").value;
  console.log(mail);
  if (mail==null) {
    alert("El usuario que ha ingresado no existe");
  }
  firebase.auth().signInWithEmailAndPassword(mail, psw).then(function(user) {
    //Este espacio es si se registra correctamente

  }).catch(function(error) {
    // Maneja los errores aquí
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

//Esta función es a la que le hacemos submit.
//Como la base de datos de firebase funciona de manera asíncrona, no podemos recibir data en una función
//y obtenerla con return
function returnMail(e){
  //Previene que el formulario se reinicie cuando se le haga submit
  e.preventDefault();
  var username = document.getElementById("username").value;
  //Hacemos referencia a la base de datos en usuarios y accedemos a la ruta del usuario que se ha ingresado
  //en el formulario
  var ref = firebase.database().ref('users/'+username);
  ref.once("value").then (function(snapshot) {
    var mail = snapshot.child('mail').val();
    //Una vez obtenido el correo de la base de datos, se invoca a la función login y le pasamos como
    //parámetro el correo
    login(mail);
  }, function (error) {
   console.log("Error: " + error.code);
  });
}


//Permite saber si el usuario autenticó o no su cuenta con el enlace enviado a su correo
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

//Obtiene la sesión actual del usuario
function currentUser(){
  var user = firebase.auth().currentUser;
  if (user) {
    return true;
  } else {
    return false;
  }
}

//Permite cambiar de página si es que no está logueado
function change(page){
  if (currentUser()==true) {
    alert("Tiene una sesión abierta, si quiere registrar un usuario debe cerrar sesión primero");
  }else{
    window.location.href = page;
  }
}


//Se cierra la sesión del usuario
function cerrar(){

  firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
}


/*
  Los display permiten la aparición o desaparición de partes de la página
*/
function displayOn(value){
  document.getElementById(value).style.display='block';
  
}

function displayOff(value){
  document.getElementById(value).style.display='none';

}