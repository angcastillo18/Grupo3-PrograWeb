//var database = firebase.database();



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
      }else {
        alert("Correo creado satisfactoriamente")
      }
      console.log(error);
    });
  }
}
  



function verificarDatos() {
  var user = document.getElementById("user").value;
  var name = document.getElementById("name").value;
  var mail = document.getElementById("mail").value;
  var psw = document.getElementById("psw").value;
  var phone = document.getElementById("phone").value;
  var regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/;

alert(mail+psw+phone);

 if ( (user == null || user.length == 0 || /^\s+$/.test(user)) ) {
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
 else if ( (!(/^\d{9}$/.test(phone)))&&phone.length>0) {
   // Si no se cumple la condicion...
   alert('Debe ingresar un número de teléfono válido, si no está seguro, deje la casilla en blanco');
   return false;
 }
 
  // Si el script ha llegado a este punto, todas las condiciones
  // se han cumplido, por lo que se devuelve el valor true
  return true;
}